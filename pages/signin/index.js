import { getCsrfToken } from "next-auth/client"
import { Button, TextField, Box, Typography, Link } from '@mui/material'
import { makeStyles } from "@mui/styles";
import { useRouter } from 'next/router';
import { width } from "@mui/system";

const useStyles = makeStyles(theme => ({
    wrapper: { 
      marginTop: '10px'
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',       
        height: '500px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '400px'
    },
    input: {
        marginBottom: '10px',
        width: '200px'
    },
    headline: {
        marginBottom: '10px'
    },
    pleaseSignIn: {
      marginBottom: '40px'
    }
}));

export default function SignIn({ csrfToken }) {
    const classes = useStyles();
    const router = useRouter();
    const queryText = router.query.text;
    
    return (
      <Box className={classes.wrapper}>
        <Box className={classes.container}>
            {queryText && (
              <Typography className={classes.pleaseSignIn} variant="h3"> Please sign in to use this page </Typography>
            )}
            <Box>
            <form className={classes.form} method="post" action="/api/auth/callback/credentials">
                <Typography className={classes.headline} variant="h4"> Sign in </Typography>
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <TextField className={classes.input} label="User name" name="username" type="text" />
                <TextField className={classes.input} label="Password" name="password" type="password" />
                <Button className={classes.input} variant="contained" type="submit">Sign in</Button>
                <Link href="/signup"> Dont have an account yet? Click here to sign up</Link>
            </form>
            </Box>
        </Box>
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