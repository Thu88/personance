import { Button, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { borderRadius } from "@mui/system";

const useStyles = makeStyles({
        button: {
            margin: '5px',
            borderRadius: '10px',
            textTransform: 'none',
        }
    },
    {
        name: 'testt'
    }
);

function MainMenu( {className} ) {

    const classes = useStyles();

    return (
        <Box className={className}>
            <Button href="/accounts" className={classes.button} color="secondary" variant="contained"><Typography>Accounts</Typography></Button>
            <Button className={classes.button} color="secondary" variant="contained"><Typography>2</Typography></Button>
            <Button className={classes.button} color="secondary" variant="contained"><Typography>3</Typography></Button>
            <Button className={classes.button} color="secondary" variant="contained"><Typography>4</Typography></Button>
        </Box>
    );
}

export default MainMenu;