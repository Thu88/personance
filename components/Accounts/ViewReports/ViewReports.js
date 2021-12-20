import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PieChart from "../../PieChart";
import { useEffect } from "react";
import { useSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '40px',
  },
  pieChart: {
    marginLeft: '200px'
  }
}));

const ViewReports = () => {
    const classes = useStyles();
    const [account, setAccount] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [session] = useSession();
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

      useEffect(() => {
        /*When the components gets activated, get all the accounts the user has created */
        fetch('/api/getaccounts', {
          method: 'POST',
          body: JSON.stringify({user: user})
        }).then(res => res.json()).then(res =>{
          if (res.message === 'success') {
            const newAccounts = res.accounts;
            setAccounts(newAccounts); //Save the accounts
          }
        });

      }, [])
  
    return (
        <Box className={classes.container}>
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
            <Box className={classes.pieChart}> <PieChart rows={rows} /></Box>
           
        </Box>
    );
}

export default ViewReports;