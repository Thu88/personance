import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

const useStyles = makeStyles({
        img: {
           width: '500px',
           height: '500px',
           marginLeft: '30px'
        }
    },
);

function HomePage() {
    const classes = useStyles();

    return ( 
      
      <Box>
        <h1>Eksamen</h1>
        <img className={classes.img} src="images/money.png" />
      </Box>
    );
}
  
export default HomePage;
  