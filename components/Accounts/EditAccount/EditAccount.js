import React from "react";
import { useEffect } from "react";
import { useSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";
import { Box, Button, TextField, Select, FormControl, InputLabel, MenuItem, Table, TableContainer,TableHead, TableRow, TableBody, TableCell, Paper, Typography } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { parse } from 'csv-parse/sync';

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
    const [session] = useSession();
    const tableRef = React.useRef();
    const containerRef = React.useRef();
    const user = session.user;

    const handleChange = (event, child) => {
      /* This function is run when the user selects an account from the dropdown list */
      const id = Number(child.props.accountindex);
      const accountNo = event.target.value;

      //Save the account
      setAccount(event.target.value);

      //Get the transactions connected to the account from the database
      fetch('/api/getaccountscontent', {
        method: 'POST',
        body: JSON.stringify({user, accountNo, id})
      })
      .then(res => res.json())
      .then(res => {
        setRows(res.rows) //Save the transactions
      })
    };

    const updateRow = () => {
      /* This function is used to update rows in the database */
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
      /* This function is used to update this components rows state */
      const tableBody = tableRef.current;
      const rowsCopy = [...rows];
      const rowId = row.id;

      const htmlCells = tableBody.rows[Number(rowId) - 1].cells;
      console.log(htmlCells[1])
      const updatedRow = {
        id: rowId,
        date: htmlCells[1].childNodes[0].childNodes[1].childNodes[0].value,
        text: htmlCells[2].childNodes[0].childNodes[0].childNodes[0].value,
        amount: htmlCells[3].childNodes[0].childNodes[0].childNodes[0].value,
        category: htmlCells[4].childNodes[0].childNodes[0].childNodes[0].value,
      }
      rowsCopy[row.id - 1] = updatedRow;
      setRows(rowsCopy);
      
    };

    const setRowDate = (row) => {
      //This function is used to update the datepicker. The datepicker uses a controlled input
      const rowsCopy = [...rows];
      
      rowsCopy[row.id - 1] = row;
      rows[row.id - 1] = row;

      setRows(rowsCopy)
    }

    const createRow = () => {
      /* This function is used to add a new row, when the user clicks on Create new row */
      const rowsCopy = [...rows];
      if (rowsCopy.length === 0) {
        rowsCopy.push({id: 1, date: null, text: '', amount: '', category: ''});
      } else {
        rowsCopy.push({id: rows[rows.length -1].id + 1, date: '', text: '', amount: '', category: ''});
      }

      setRows(rowsCopy);
    };

    const deleteRow = (row) => {
      /* This function is used to delete a row */
      const rowsCopy = [...rows];
      const index = rowsCopy.findIndex((currentRow) => currentRow.id === row.id);
      rowsCopy.splice(index, 1)
      setRows(rowsCopy);
    };

    const handleFileUpload = (event) => {
      /* This function is used to import a CSV file */
      const importedCsvFile = event.target.files[0];
      const reader = new FileReader();
      
      reader.addEventListener("load", () => {
        const text = reader.result;
        const records = parse(text, {delimiter: ';'}); //Parse the CSV file to the variable
        const id = rows.length === 0 ? 1 : rows[rows.length -1].id + 1
        const rowsToBeAdded = records.slice(1).map((record, index) => { //Map all transactions except the first one which contains some head lines to the CSV transactions
          const csvDate = record[0].split("."); //Get the date from the transaction since a Date object has to be created
          
          //Return an object containing all transaction information
          return {id: id + index, date: new Date(csvDate[2], csvDate[1] -1, csvDate[0]), text: record[1], amount: record[2], category: ''};
        });

        //Set the rows state to the new transactions from the CSV file
        setRows([...rows, ...rowsToBeAdded])
      })
      reader.readAsText(importedCsvFile);
    }

    useEffect(() => {
      //The diagrams sometimes keep rendering even though the component isn't active.
      //This timeout callback scrolls a little on the page to make the diagram stop rendering
        setTimeout(() => {
          containerRef.current.className = classes.containerAfterUpdate
        }, 30)
        //When the components gets activated, get all the accounts the user has created
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
            <FormControl fullWidth> {/* The account dropdown list */}
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
              <label htmlFor="raised-button-file"> {/* The button where you can import CSV files */}
                <Button variant="contained" color="secondary" component="span" className={classes.button}>
                  <Typography>Upload csv file</Typography>
                </Button>
              </label> 
            </Box>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="spanning table"> {/* The table containing all the transactions */}
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
                <TableBody ref={tableRef}>
                    {rows.map((row, index) => {
                      return (
                        <TableRow key={row.id}>
                          <TableCell aria-disabled align="left">{row.id}</TableCell>
                          <TableCell align="left">
                          <LocalizationProvider dateAdapter={AdapterDateFns}> {/* The datepicker component */}
                            <DatePicker
                              label="Dato"
                              value = {rows[index].date}
                              onChange={(newValue) => {
                                setRowDate({...row, date: newValue})
                              }} 
                              renderInput={(params) => {
                                  return <TextField {...params} />
                                }}                      
                            />
                          </LocalizationProvider>
                          </TableCell>
                          <TableCell align="left">
                            <TextField
                            type="text"
                            defaultValue={rows[index].text}                       
                            />
                          </TableCell>                 
                          <TableCell align="left">
                            <TextField 
                              defaultValue={rows[index].amount} 
                              />
                          </TableCell>                  
                          <TableCell align="left">
                            <TextField 
                              defaultValue={rows[index].category}
                             />
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