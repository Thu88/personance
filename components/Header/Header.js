import { AppBar, Box, CardMedia, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MainMenu from '../MainMenu';

const useStyles = makeStyles({
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '100px',
        },
        menu: {
            marginRight: '100px'
        },
        logo: {
            marginRight: '50px',
            height: '111px',
            width: '392px'
        },
        divider: {
            marginLeft:'auto',
            marginRight:'100px'
        }
        
    },
    {
        name: 'Header'
    }
);

function Header() {

    const classes = useStyles();

    return (
        <Box>
            <AppBar className={classes.header} position="sticky">
                <MainMenu className={classes.menu} />
                <Divider className={classes.divider} flexItem orientation="vertical" />
            
                <img className={classes.logo} src="images/Logo2.svg"></img>
            </AppBar>
        </Box>
    );
}

export default Header;