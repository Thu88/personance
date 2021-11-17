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
            marginRight: '200px',
            height: '99px',
            width: '177px'
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
                <CardMedia className={classes.logo} image="images/Logo.png" />
            </AppBar>
        </Box>
    );
}

export default Header;