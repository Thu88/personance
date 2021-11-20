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
            <Typography className={classes.headline} variant="h4"> Sign in </Typography>
            <form className={classes.form} method="post" action="/api/auth/callback/credentials">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <TextField className={classes.input} label="User name" name="username" type="text" />
                <TextField className={classes.input} label="Password" name="password" type="password" />
                <Button className={classes.input} variant="contained" type="submit">Sign in</Button>
            </form>
            <Link href="/signup"> Dont have an account yet? Click here to sign up</Link>
        </Box>
    )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await getCsrfToken(context)
  }
}
*/