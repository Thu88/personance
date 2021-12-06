import { Box } from '@mui/material';
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import React from 'react';
let pieChart;

function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}

const PieChart = ({ rows }) => {
    const [expenses, setExpenses] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [amounts, setAmounts] = React.useState([])
    const pieRef = useRef();
    Chart.register(ChartDataLabels, ...registerables)
    if (rows.toString() !== expenses.toString()) {

        const categoryExpenses = rows.map(row => {
            const amountFormated = Number(row.amount.replace('.', '').replace(',', '.'));
            return {'category': row.category, 'amount': amountFormated};
        });
        console.log("rows:", rows)
        console.log("categoryExpenses:",categoryExpenses)
        setExpenses(rows);
        const categoryExpensesFormated = [];
        
        for (let row of categoryExpenses) {
            
            if (row.category === '') {
                row.category = 'Other';
            }

            const sameCategoryIndex = categoryExpensesFormated.findIndex(elem => row.category === elem.category);

            if(categoryExpensesFormated.length === 0) {
                categoryExpensesFormated.push({...row});
                continue;
            }


            if (sameCategoryIndex !== -1) {
                categoryExpensesFormated[sameCategoryIndex].amount += row.amount;
            } else {
                categoryExpensesFormated.push({...row});
            }

           
        }

        const tempCategories = categoryExpensesFormated.map((elem) => {
            return elem.category;
        });

        const tempAmounts = categoryExpensesFormated.map((elem) => {
            return elem.amount;
        });

        setCategories(tempCategories);
        setAmounts(tempAmounts);

        pieChart.data.datasets[0].data = tempAmounts;
        pieChart.data.labels = tempCategories;
        pieChart.data.datasets[0].backgroundColor = tempCategories.map((elem, index) => {
            const color = generateRandomColor();
            return color;
        })
        pieChart.data.indexLabelPlacement = true;

        pieChart.update()

    }
    
    useEffect(() => {
        const myChartRef = pieRef.current.getContext("2d");
        myChartRef.getContextimageSmoothingEnabled = true
        pieChart = new Chart(myChartRef, {
            type: "pie",
            data: {
                //Bring in data
                labels: categories,
                datasets: [
                    {
                        indexLabelPlacement: 'inside',
                        label: "Sales",
                        data: amounts,
                    }
                ],
              
            },
            options: {
                borderColor: 'black',
                plugins: {
                    tooltip: {
                        enabled: false,
                    },
                    legend: {
                        display: false
                    },
                    datalabels: {
                      display: true,
                      formatter: (val, ctx) => {
                        return `${ctx.chart.data.labels[ctx.dataIndex]} ${val} Kr.`;
                      },
                      align: 'bottom',
                      borderRadius: 3,
                      font: {
                        size: 18,
                      },
                      backgroundColor: '#404040',
                      color: '#fff',
                    },
                  }
            },
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