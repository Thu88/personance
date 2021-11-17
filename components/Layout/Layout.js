import * as React from 'react';
import Header from "../Header";
import SubMenu from '../SubMenu';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {makeStyles} from "@mui/styles";
import {Box, Paper} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#27a82ca0'
        },
        secondary: {
            main: 'rgb(25, 118, 210)'
        }
    }
});

const useStyles = makeStyles({
    mainArea: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
        justifyContent: 'space-between'
    },
    subMenu: {
        height: '70vh',
        width: '17vh'
    },
    main: {
        height: '70vh',
        width: '73vw',
        padding: '30px 70px',
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
            </ThemeProvider>
        </>
    );
}

export default Layout;