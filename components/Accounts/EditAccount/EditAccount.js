import React from "react";
import { useEffect } from "react";
import { useSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";
import { Box, Button, RaisedButton, TextField, Select, FormControl, InputLabel, MenuItem, Table, TableContainer,TableHead, TableRow, TableBody, TableCell, Paper, Typography } from '@mui/material'
import { Label } from "@mui/icons-material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { parse } from 'csv-parse/sync';
import { margin } from "@mui/system";

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '30px',
      height: '68vh'
    },
    containerAfterUpdate: {
      display: 'flex',
      flexDirection: 'column',
      rowGap: '30px',
    },
    button: {
      marginRight: '10px',
      textTransform: 'none',
    },
    uploadButton: {
      width: '300px',
      margin: '0 auto',
      textTransform: 'none',
    }
}));

const EditAccount = () => {
    const classes = useStyles();
    const [account, setAccount] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [session] = useSession();
    const user = session.user;

    const handleChange = (event, child) => {
      const id = Number(child.props.accountindex);
      const accountNo = event.target.value;
      console.log(event.target.value)
      setAccount(event.target.value);

      fetch('/api/getaccountscontent', {
        method: 'POST',
        body: JSON.stringify({user, accountNo, id})
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setRows(res.rows)
      })
    };

    const updateRow = () => {
      const id = accounts.findIndex((acc) => acc === account)
      fetch('/api/editaccount', {
        method: 'POST',
        body: JSON.stringify({user, account, id, rows})
      })
      .then(res => res.json())
      .then(res => {
        console.log(res.message)
      })

    };

    const setRow = (row) => {
      const rowsCopy = [...rows];
      const index = rowsCopy.findIndex((currentRow) => currentRow.id === row.id);
      rowsCopy[index] = row;
      setRows(rowsCopy);
      console.log(rowsCopy)
    };

    const createRow = () => {
      const rowsCopy = [...rows];
      if (rowsCopy.length === 0) {
        rowsCopy.push({id: 1, date: null, text: '', amount: '', category: ''});
      } else {
        rowsCopy.push({id: rows[rows.length -1].id + 1, date: '', text: '', amount: '', category: ''});
      }

      setRows(rowsCopy);
    };

    const deleteRow = (row) => {
      const rowsCopy = [...rows];
      const index = rowsCopy.findIndex((currentRow) => currentRow.id === row.id);
      rowsCopy.splice(index, 1)
      setRows(rowsCopy);
    };

    const handleFileUpload = (event) => {
      const importedAccountRows = [];
      const importedCsvFile = event.target.files[0];
      const reader = new FileReader();
      
      reader.addEventListener("load", () => {
        const text = reader.result;
        const records = parse(text, {delimiter: ';'});
        const id = rows.length === 0 ? 1 : rows[rows.length -1].id + 1
        const rowsToBeAdded = records.slice(1).map((record, index) => {
          const csvDate = record[0].split(".");
          console.log(csvDate)
          return {id: id + index, date: new Date(csvDate[2], csvDate[1] -1, csvDate[0]), text: record[1], amount: record[2], category: ''};
        });

        console.log(rowsToBeAdded)
        setRows([...rows, ...rowsToBeAdded])
      })
      reader.readAsText(importedCsvFile);
    }

    const containerRef = React.useRef();
    useEffect(() => {
        setTimeout(() => {
          containerRef.current.className = classes.containerAfterUpdate
          console.log(containerRef)
        }, 30)
        fetch('/api/getaccounts', {
          method: 'POST',
          body: JSON.stringify({user: user})
        }).then(res => res.json()).then(res =>{
          if (res.message === 'success') {
            const newAccounts = res.accounts;
            setAccounts(newAccounts);
          }
        });

      }, [])

    return (
        <Box ref={containerRef} id="editAccountContainer" className={classes.container}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Account</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account}
                label="Account"
                onChange={handleChange}
                >
                    {accounts.map((acc, index) => {
                        return (<MenuItem accountindex={`${index}`} key={`${acc}:${index}`} value={acc}>{acc}</MenuItem>);
                    })}
                </Select>
            </FormControl>
            <Box>
              <Button className={classes.button} onClick={createRow} variant="contained" color="secondary">
                <Typography>Create new row</Typography>
              </Button>
              <input
                accept="text/csv"
                className={classes.input}
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="secondary" component="span" className={classes.button}>
                  <Typography>Upload csv file</Typography>
                </Button>
              </label> 
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Id</TableCell>
                    <TableCell align="left">Dato</TableCell>
                    <TableCell align="left">Tekst</TableCell>
                    <TableCell align="left">Beløb</TableCell>
                    <TableCell align="left">Kategori</TableCell>
                    <TableCell align="left">Updater</TableCell>
                    <TableCell align="left">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell aria-disabled align="left">{row.id}</TableCell>
                          <TableCell align="left">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Dato"
                              value={rows[index].date}
                              onChange={(newValue) => {
                                setRow({...rows[index], date: newValue})
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                            type="text"
                            value={rows[index].text}
                            onChange={(newValue) => {
                              setRow({...rows[index], text: newValue.target.value})
                            }} />
                          </TableCell>
                          
                          <TableCell align="left">
                            <TextField 
                              value={rows[index].amount} 
                              onChange={(newValue) => {
                                setRow({...rows[index], amount: newValue.target.value})
                              }}/>
                          </TableCell>
                          
                          <TableCell align="left">
                            <TextField 
                              value={rows[index].category}
                              onChange={(newValue) => {
                                setRow({...rows[index], category: newValue.target.value})
                              }}/>
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => {
                              setRow(row);
                              updateRow();
                            }}>Updater</Button>
                          </TableCell>
                          <TableCell>
                            <Button variant="contained" color="secondary" onClick={() => {
                              deleteRow(row);
                              updateRow();
                            }}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                </TableBody>
              </Table>
            </TableContainer>

            <Button variant="contained" color="secondary" onClick={updateRow} className={classes.uploadButton}><Typography>Upload all</Typography></Button>
        </Box>
    );
};

export default EditAccount;