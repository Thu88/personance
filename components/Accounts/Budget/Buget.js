import React from "react";
import { useEffect } from "react";
import {getSession} from 'next-auth/client';
import { makeStyles } from "@mui/styles";
import { Box, Paper, List, ListItem, Label, TextField, Typography, Divider } from '@mui/material'

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
        getContent();
        async function getContent() {
            const session = await getSession();
            user = session.user;
            await getAccountsContent();
            await getMonthNames();    
        }
      
        async function getAccountsContent() {
            const accountsContentCopy = []
            
            for (let i = 0; i < accounts.length; i++) {
                let acc = accounts[i];
                const index = i;         
                 await fetch('/api/getaccountscontent', {
                    method: 'POST',
                    body: JSON.stringify({user, accountNo: acc, id: index})
                  })
                  .then(res => res.json())
                  .then(res => {
                    accountsContentCopy.push({
                     accountNumber: acc,
                     rows: res.rows
                   })
                  })
            }

            setAccountsContent(accountsContentCopy) 
        }
        
        async function getMonthNames() {
            const monthsTotalCopy = [];
            for (let i = 0; i < accountsContent.length; i++) {
                const acc = accountsContent[i];
                const months = [];

               acc.rows.forEach((row) => {
                    const dateConv = new Date(row.date);
                    const rowMonth = dateConv.getMonth();
                    if (months.length === 0) {
                        months.push(rowMonth);
                        return;
                    }
                    if (months.find((month) => month === rowMonth)) {
                        return;
                    } else {
                        months.push(rowMonth);
                    }
                });
                monthsTotalCopy.push({accountNo: acc, months})
            }
            setMonthsTotal(monthsTotalCopy)
        }  
    }, [accounts]);

    useEffect(() => {
        initialize();
        async function initialize() {
            const session = await getSession();
            console.log(session);
            user = session.user;
            
            fetch('/api/getaccounts', {
                method: 'POST',
                body: JSON.stringify({user: user})
              }).then(res => res.json()).then(async res =>{
                if (res.message === 'success') {
                  const newAccounts = res.accounts;
                  console.log('newaccounts', newAccounts)
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