import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Box, List, ListItem, Paper, Checkbox, Form, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession} from 'next-auth/client';
import { display, margin } from "@mui/system";

const useStyles = makeStyles(theme => ({
    createAccountContainer: {
      width: '400px',
      display: 'flex',
      flexDirection: 'column',
      rowGap: '25px',
      marginLeft: '100px'
    },
    listContainer: {
      width: '400px',
      padding: '0px 15px 10px 15px',
    },
    list: {
      display:'flex',
      flexDirection: 'column',
      rowGap: '10px',
    },
    listItem: {
      //margin: '14px 0 14px 7px'
    },
    button: {
      width: '200px',
      textTransform: 'none',
      margin: '0 auto'
    },
    accountField: {
      
    },
    listHeadline: {
      textAlign: 'center'
    },
    checkBox: {
      padding: '0px',
    },
}));


const CreateAccount = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [accountNo, setAccountNo] = React.useState('');
    const [session] = useSession();
    const router = useRouter();
    const user = session.user;
    const [accounts, setAccounts] = React.useState([])
    const handleAccountChange = (event) => {
      setAccountNo(event.target.value);
    };

    const postAccount = () => {
      console.log(user, accountNo)
      fetch('/api/createaccount', {
        method: 'POST',
        body: JSON.stringify({user: user, accountNo: accountNo})
      }).then(res => res.json()).then(res =>{
        console.log(res)
        if (res.message === 'success') {
          const newAccounts = [...accounts];
          newAccounts.push(accountNo);
          setAccounts(newAccounts);
        }
      })
    };

    const deleteAccount = () => {
      const newAccounts = accounts.filter((value, index) => checked.indexOf(`${index}`) === -1);
      console.log(newAccounts);
      fetch('/api/deleteaccount', {
        method: 'POST',
        body: JSON.stringify({user, newAccounts})
      }).then(res => res.json()).then(res =>{
        console.log(res)
        if (res.message === 'success') {
          setAccounts(newAccounts);
        }
      });
    };



    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      console.log(currentIndex)
      setChecked(newChecked);
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

    console.log(checked)
    return (
        <>  
            <Box className={classes.createAccountContainer}>
                <TextField className={classes.accountField} variant="standard"  placeholder="Account number" value={accountNo} onChange={handleAccountChange} />
                <Button disabled={accountNo !== '' ? false : true} className={classes.button} variant="contained" color="secondary" onClick={postAccount}><Typography>Create account</Typography></Button>
            
                <Paper className={classes.listContainer}>
                    <List className={classes.list}>
                      <Typography className={classes.listHeadline} variant="h5">Current accounts:</Typography>
                      {accounts.map((value, index) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem className={classes.listItem}
                            key={`${index}:${value}`}
                            secondaryAction={
                              <Checkbox
                                className={classes.checkBox}
                                edge="end"
                                onChange={handleToggle(`${index}`)}
                                checked={checked.indexOf(`${index}`) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            }
                            disablePadding
                          >
                            {value}
                          </ListItem>
                        );
                      })}
                    </List>
                </Paper>
                <Button className={classes.button} variant="contained" color="secondary" onClick={deleteAccount} ><Typography>Delete account</Typography></Button>
            </Box>
        </>
    );
};

export default CreateAccount;