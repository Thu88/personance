import React from "react";
import { useEffect } from "react";
import { useSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";
import { Box, Button, TextField, Select, FormControl, InputLabel, MenuItem, Table, TableContainer,TableHead, TableRow, TableBody, TableCell, Paper } from '@mui/material'
import { Label } from "@mui/icons-material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';


const useStyles = makeStyles(theme => ({
    
}));
//save ssh
const EditAccount = () => {
    const classes = useStyles();
    const [account, setAccount] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [session] = useSession();
    const user = session.user;

    const handleChange = (event) => {
      setAccount(event.target.value);
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

    useEffect(() => {
        fetch('/api/getaccounts', {
          method: 'POST',
          body: JSON.stringify({user: user})
        }).then(res => res.json()).then(res =>{
          if (res.message === 'success') {
            const newAccounts = res.accounts;
            setAccounts(newAccounts);
          }
        })
      }, [])

    return (
        <Box>
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
                        return (<MenuItem key={`${acc}:${index}`} value={acc}>{acc}</MenuItem>);
                    })}
                </Select>
            </FormControl>
            <Box>
              <Button onClick={createRow} variant="contained" color="secondary">
                Create new row
              </Button>
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
                              updateRow(row.id);
                            }}>Updater</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                </TableBody>
              </Table>
            </TableContainer>
        </Box>
    );
};

export default EditAccount;