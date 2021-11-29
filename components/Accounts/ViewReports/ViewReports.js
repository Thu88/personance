import React from "react";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import PieChart from "../../PieChart";
import { useEffect } from "react";
import { useSession} from 'next-auth/client';

const ViewReports = () => {
    const [account, setAccount] = React.useState('');
    const [accounts, setAccounts] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [session] = useSession();
    const user = session.user;

    const handleChange = (event, child) => {
        const id = Number(child.props.accountindex);
        const accountNo = event.target.value;
        console.log(event.target.value)
        setAccount(event.target.value);
  
        fetch('/api/getaccountscontent', {
          method: 'POST',
          body: JSON.stringify({user, accountNo, id})
        })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          setRows(res.rows)
        })
      };

      useEffect(() => {
        fetch('/api/getaccounts', {
          method: 'POST',
          body: JSON.stringify({user: user})
        }).then(res => res.json()).then(res =>{
          if (res.message === 'success') {
            const newAccounts = res.accounts;
            setAccounts(newAccounts);
          }
        });

      }, [])
  
    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Account</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={account}
                label="Account"
                onChange={handleChange}
                >
                    {accounts.map((acc, index) => {
                        return (<MenuItem accountindex={`${index}`} key={`${acc}:${index}`} value={acc}>{acc}</MenuItem>);
                    })}
                </Select>
            </FormControl>
            <PieChart rows={rows} />
        </Box>
    );
}

export default ViewReports;