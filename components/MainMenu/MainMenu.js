import { Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
        button: {
            margin: '5px',
            borderRadius: '10px',
            textTransform: 'none',
        }
    },
);

function MainMenu( {className} ) {

    const classes = useStyles();

    return (
        <Box className={className}>
            <Button href="/accounts" className={classes.button} color="secondary" variant="contained"><Typography>Accounts</Typography></Button>
        </Box>
    );
}

export default MainMenu;