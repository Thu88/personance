import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Paper, Box, Button, Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UPDATE_SUBMENU } from '../../redux/actionTypes';

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
        padding: '30px 70px',
    },
    button: {
        width: '200px',
        margin: '5px 0px',
        textTransform: 'none',
    }
}));

const SubMenu = ({ className }) => {
    const classes = useStyles();
    const {submenu} = useSelector(state => state.submenu);
    const dispatch = useDispatch();

    const sendDispatch = (entryName) => {
        /* This function activates the submenu entry when it is called */

        //Find the index of the submenu entry in the submenu state in Redux
        const entryIndex = submenu.findIndex(entry => entry.name === entryName);
        
        //Reset all other submenu items
        submenu.forEach((entry) => {
            entry.active = false;
        });

        //Make the clicked submenu item active
        submenu[entryIndex].active = true;
        
        //Update the submenu state in Redux
        dispatch({
            type: UPDATE_SUBMENU,
            payload: {
                submenu: submenu
            }
        });
    };

    return (
        <Box className={className}>
            <Paper className={`${className} ${classes.paper}`} position="sticky">
               {submenu.map((entry) => {
                   return ( 
                    <Button onClick={() => sendDispatch(entry.name)} name={entry.name.replace(' ', '_')} key={entry.name} className={classes.button} variant="contained" color="secondary">
                      <Typography>{entry.name}</Typography> 
                    </Button>
                   )
               })}
            </Paper>
        </Box>
    );
};

export default SubMenu;