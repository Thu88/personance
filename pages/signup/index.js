import { getCsrfToken } from "next-auth/client"
import { Button, TextField, Box, Typography, Link } from '@mui/material'
import { makeStyles } from "@mui/styles";

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

export default function SignIn({ csrfToken }) {
    const classes = useStyles();
    
    return (
        <Box className={classes.container}>
            <Typography className={classes.headline} variant="h4"> Sign up </Typography>
            <form className={classes.form} method="post" action="/api/signup">
                <TextField className={classes.input} label="User name" name="username" type="text" />
                <TextField className={classes.input} label="Password" name="password" type="password" />
                <Button className={classes.input} variant="contained" type="submit">Sign up</Button>
            </form>
        </Box>
    )
}