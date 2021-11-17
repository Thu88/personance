import { Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { borderRadius } from "@mui/system";

const useStyles = makeStyles({
        button: {
            margin: '5px',
            borderRadius: '10px'
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
            <Button className={classes.button} color="secondary" variant="contained">1</Button>
            <Button className={classes.button} color="secondary" variant="contained">2</Button>
            <Button className={classes.button} color="secondary" variant="contained">3</Button>
            <Button className={classes.button} color="secondary" variant="contained">4</Button>
        </Box>
    );
}

export default MainMenu;