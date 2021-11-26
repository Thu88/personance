import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button, Box, List, ListItem, Paper, Checkbox, Form } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession} from 'next-auth/client';

const useStyles = makeStyles(theme => ({
    createAccountContainer: {
        width: '400px',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '40px'

    },
    list: {
        width: '400px',
        padding: '5px'
    },
    listItem: {
      margin: '14px 0 14px 7px'
    }
}));


const CreateAccount = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [accountNo, setAccountNo] = React.useState('a');
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
                <TextField variant="standard" placeholder="Account number" value={accountNo} onChange={handleAccountChange} />
                <Button variant="contained" color="secondary" onClick={postAccount}>Create account</Button>
            </Box>
            <Box className={classes.deleteAccountContainer}>
                <Paper className={classes.list}>
                    <List>
                      {accounts.map((value, index) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem className={classes.listItem}
                            key={`${index}:${value}`}
                            secondaryAction={
                              <Checkbox
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
                <Button variant="contained" color="secondary" onClick={deleteAccount} >Delete</Button>
            </Box>
        </>
    );
};

export default CreateAccount;