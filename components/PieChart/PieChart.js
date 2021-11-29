import { Box } from '@mui/material';
import { Chart, registerables } from 'chart.js'
import { useEffect, useRef } from 'react';

const PieChart = () => {
    const pieRef = useRef();
    Chart.register(...registerables)
    let pieChart;
    useEffect(() => {
        const myChartRef = pieRef.current.getContext("2d");
        myChartRef.getContextimageSmoothingEnabled = true
        console.log(myChartRef)
        pieChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Sales",
                        data: [86, 67, 91],
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
        return () => {
           
        };
    }, [])
    
    return (
        <Box id="chartcontainer" style={{width: '500px', height: '500px'}}>
           <canvas ref={pieRef} id="pieChart" />
        </Box>        
        
    )
};

export default PieChart;