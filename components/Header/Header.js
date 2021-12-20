import { AppBar, Box, Divider, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MainMenu from '../MainMenu';
import MainPopupMenu from "../MainPopupMenu";

const useStyles = makeStyles({
        header: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: '40px',
        },
        menu: {
            marginRight: '100px',
            marginLeft: '160px'
        },
        logo: {
            marginRight: '50px',
            height: '111px',
            width: '392px',
            objectFit: 'cover'
        },
        divider: {
            marginRight:'100px'
        },
        popupMenu: {
            marginLeft:'auto', 
            marginRight: '50px'        
        },
        homeLink: {
            textShadow: '1px 1px black',
            textDecoration: 'none',
        },
        
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
                <Link className={classes.homeLink} href="/"><Typography color="black" variant="h3">Personance</Typography></Link>
                <MainMenu className={classes.menu} />
                <MainPopupMenu className={classes.popupMenu} />
                <Divider className={classes.divider} flexItem orientation="vertical" />
                <img className={classes.logo} src="images/Logo4.svg"></img>
            </AppBar>
        </Box>
    );
}

export default Header;