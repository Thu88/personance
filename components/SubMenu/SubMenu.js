import { Paper, Box} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
        padding: '30px 70px',
    }
}));

const SubMenu = ({ className }) => {
    const classes = useStyles();

    return (
        <Box className={className}>
            <Paper className={`${className} ${classes.paper}`} position="sticky">
               test
            </Paper>
        </Box>
    );
};

export default SubMenu;