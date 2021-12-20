import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Box, List, ListItem, Paper, Checkbox, Typography } from "@mui/material";
import { useSession} from 'next-auth/client';

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
    const user = session.user;
    const [accounts, setAccounts] = React.useState([])
    
    const handleAccountChange = (event) => {
      /* This function saves the account the user writes to the input field. It is a controlled input */
      setAccountNo(event.target.value);
    };

    const postAccount = () => {
      /* This function saves the saved account to the database */
      fetch('/api/createaccount', {
        method: 'POST',
        body: JSON.stringify({user: user, accountNo: accountNo})
      }).then(res => res.json()).then(res =>{
        console.log(res)
        if (res.message === 'success') {
          const newAccounts = [...accounts];
          //The accounts in the list is updated with the new account after it has been saved in the database
          newAccounts.push(accountNo);
          setAccounts(newAccounts);
        }
      })
    };

    const deleteAccount = () => {
      /* This function deletes the account which the user has selected */
      const newAccounts = accounts.filter((value, index) => checked.indexOf(`${index}`) === -1);
      fetch('/api/deleteaccount', {
        method: 'POST',
        body: JSON.stringify({user, newAccounts})
      }).then(res => res.json()).then(res =>{
        console.log(res)
        if (res.message === 'success') {
          //The accounts in the list is updated after the account has been deleted from the database
          setAccounts(newAccounts);
        }
      });
    };



    const handleToggle = (value) => () => {
      /* This function makes it possible to check one of the checkboxes, when the user selects an account */
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        //If the checkbox isn't checked, check it
        newChecked.push(value); 
      } else {
        //If the checkbox is already checked, uncheck it
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };

    useEffect(() => {
      /* When the components gets activated, get all the accounts the user has created */
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