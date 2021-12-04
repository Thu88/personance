import { getCsrfToken, signIn } from "next-auth/client"
import { Button, TextField, Box, Typography, Link } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { singIn } from 'next-auth/client';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    input: {
        marginBottom: '10px',
        width: '200px'
    },
    headline: {
        marginBottom: '10px'
    }
}));

export default function SignUp({ csrfToken }) {
    const classes = useStyles();
    const postSignup = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        const username = formProps.username;
        const password = formProps.password
        console.log(username, password)
        fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({username, password})
          }).then(res => res.json()).then(res =>{
            if (res.message === 'success') {
              signIn('credentials', { redirect: false, username: formProps.username, password: formProps.password })
            }
          });
    }
    
    return (
        <Box className={classes.container}>
            <Typography className={classes.headline} variant="h4"> Sign up </Typography>
            <form className={classes.form} onSubmit={postSignup}>
                <TextField className={classes.input} label="User name" name="username" type="text" />
                <TextField className={classes.input} label="Password" name="password" type="password" />
                <Button className={classes.input} variant="contained" type="submit">Sign up</Button>
            </form>
        </Box>
    )
}