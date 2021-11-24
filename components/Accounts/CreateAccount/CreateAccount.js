import React from "react";
import useSWR from 'swr'
import { makeStyles } from "@mui/styles";
import { TextField, Button, Box, List, ListItem, Paper, Checkbox } from "@mui/material";
import { useRouter } from 'next/router';
import { useSession} from 'next-auth/client';
import { useSelector } from "react-redux";


const useStyles = makeStyles(theme => ({
    createAccountContainer: {
        width: '400px',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '40px'

    },
    list: {
        width: '400px'
    }
}));


const CreateAccount = () => {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1]);
    const [session] = useSession();
    const router = useRouter();
    const {user} = useSelector(state => state.user);

    fetch('/api/createaccount', {
        method: 'POST',
        body: {
            user,
        }
    }
    )
    setTimeout(() => {
        console.log(session);
    }, 3000)   


    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
        console.log("2",session)
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };

    return (
        <>  
            <Box className={classes.createAccountContainer}>
                <TextField variant="standard" placeholder="Account number" />
                <Button variant="contained" color="secondary">Create account</Button>
            </Box>
            <Box className={classes.deleteAccountContainer}>
                <Paper className={classes.list}>
                    <List>
                    {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
          </ListItem>
        );
      })}
                    </List>
                </Paper>
            </Box>
        </>
    );
};

export default CreateAccount;