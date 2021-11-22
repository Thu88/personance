import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Paper, Box, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
        padding: '30px 70px',
    },
    button: {
        width: '200px',
        margin: '0px'
    }
}));

const SubMenu = ({ className }) => {
    const classes = useStyles();
    const {submenu} = useSelector(state => state.submenu)
    console.log(submenu)
    return (
        <Box className={className}>
            <Paper className={`${className} ${classes.paper}`} position="sticky">
               {submenu.map((entry) => {
                   return <Button key={entry.name} className={classes.button} variant="contained" color="secondary">{entry.name} </Button>
               })}
            </Paper>
        </Box>
    );
};

export default SubMenu;