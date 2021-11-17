import { AppBar, Box, Card, Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    content: {
        margin: 'auto auto',
        padding: '4px 30px',
        borderRadius: '8px'
    }
}));

const Footer = ( {className}) => {
    const classes = useStyles();

    return (
        <Box>
            <AppBar position="sticky" className={`${className}`}>
                <Card className={classes.content}>
                    <Typography textAlign="center"><Link>About </Link></Typography>
                    <Typography>Copyright 2021 ©</Typography>
                </Card>
            </AppBar>
        </Box>
    );
}

export default Footer;