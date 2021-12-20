import React from "react";
import { useEffect } from "react";
import {getSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";
import { Box, Paper, List, ListItem, Typography, Divider } from '@mui/material'

const useStyles = makeStyles(theme => ({
    accContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    accNo: {
        fontWeight: 'bolder',
        marginRight: '10px'
    },
    divider: {
    }
   

}));

const Budget = () => {
    const classes = useStyles();
    let user;
    const [accounts, setAccounts] = React.useState([]);
    const [accountsContent, setAccountsContent] = React.useState([]);
    const [monthsTotal, setMonthsTotal] = React.useState([]);
    
    useEffect(() => {
        /* Every time the accounts state changes, this function run once */
        getContent();
        async function getContent() {
            /* This function gets the session and runs functions to get the accounts content and month names */
            const session = await getSession();
            user = session.user;
            await getAccountsContent();
            await getMonthNames();    
        }
      
        async function getAccountsContent() {
            /* This function gets the content of all of the user's accounts */
            const accountsContentCopy = []
            
            for (let i = 0; i < accounts.length; i++) { //Run through all the user's account
                let acc = accounts[i];
                const index = i;         
                 await fetch('/api/getaccountscontent', { //Get the content from the account
                    method: 'POST',
                    body: JSON.stringify({user, accountNo: acc, id: index})
                  })
                  .then(res => res.json())
                  .then(res => {
                    accountsContentCopy.push({ //Save an object with the account number and transactions in the array
                     accountNumber: acc,
                     rows: res.rows
                   })
                  })
            }

            setAccountsContent(accountsContentCopy) //Save all the transactions in the AccountsContent state
        }
        
        async function getMonthNames() {
            /* The purpose of this function is to find out how much the user has spend in total each month */
            const monthsTotalCopy = [];
            for (let i = 0; i < accountsContent.length; i++) { //Run throuh the array containing all the transactions
                const acc = accountsContent[i];
                const months = [];

                acc.rows.forEach((row) => { //Run through one set of transactions
                    const dateConv = new Date(row.date);
                    const rowMonth = dateConv.getMonth(); //Get the month of the transaction
                    if (months.length === 0) {
                        months.push(rowMonth); //Add the month if no month has been saved
                        return;
                    }
                    if (months.find((month) => month === rowMonth)) { //If months has been saved, find out if the current month already exists in the array
                        return;                                       //If it does exist, do nothing
                    } else {
                        months.push(rowMonth); //If it doesn't exist, add it to the array
                    }
                });
                monthsTotalCopy.push({accountNo: acc, months})
            }
            setMonthsTotal(monthsTotalCopy)
        }  
    }, [accounts]);

    useEffect(() => {
        /* When the components gets activated, get all the accounts the user has created */
        initialize();
        async function initialize() {
            const session = await getSession();
            user = session.user;
            
            fetch('/api/getaccounts', {
                method: 'POST',
                body: JSON.stringify({user: user})
              }).then(res => res.json()).then(async res =>{
                if (res.message === 'success') {
                  const newAccounts = res.accounts;
                  setAccounts(newAccounts);        
                }
              });
        }   
    }, [])
    return (
        <Box>
            <Paper>
                <List>
                    {accounts.map((acc, index) => {
                        return (
                            <Box key={`${acc}:${index}`}>
                                <ListItem key={`${acc}${index}`}>
                                    <Box className={classes.accContainer}>
                                        <Typography className={classes.accNo}>Account number: </Typography>
                                        <Typography className={classes.acc}> {acc}</Typography>
                                    </Box>

                                    <Box className={classes.accContainer}>
                                        <Typography className={classes.accNo}>Account number: </Typography>
                                        <Typography className={classes.acc}> {acc}</Typography>
                                    </Box>
                                    
                                </ListItem>
                                <Box key={`divider${acc}${index}`} className={classes.divider}><Divider /></Box>  
                            </Box>
                            
                        )
                    })}
                </List>
            </Paper>
        </Box>
    )
};

export default Budget;