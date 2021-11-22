import * as React from 'react';
import Header from "../Header";
import SubMenu from '../SubMenu';
import Footer from '../Footer';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import {Box, Paper} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#27a82ca0'
        },
        secondary: {
            main: '#5E30BA'
        }
    }
});

const useStyles = makeStyles({
    mainArea: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
        marginBottom: '10px',
        justifyContent: 'space-between'
    },
    subMenu: {
        height: '69vh',
        width: '200px'
    },
    main: {
        height: '69vh',
        width: 'calc(100vw - 550px)',
        padding: '30px 70px',
    },
    footer: {
        top: 'auto',
        bottom: '0',
        height: '9vh'
    }
})


function Layout({ children }) {
    const classes = useStyles();

    return (
        <>
            <ThemeProvider theme={theme}>
                <Header />
                <Box className={classes.mainArea}>
                    <SubMenu className={classes.subMenu} />
                    <Paper className={classes.main}>
                        <main>{children}</main>
                    </Paper>
                   
                </Box>

                <Footer className={classes.footer} />
            </ThemeProvider>
        </>
    );
}

export default Layout;