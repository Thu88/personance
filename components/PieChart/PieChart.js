import { Box } from '@mui/material';
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import React from 'react';
let pieChart;

function generateRandomColor(){
    /* This function returns a random color as a hexadicimal string */
    let maxVal = 0xFFFFFF;
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

    //Only update the chart if the rows props are different then the saved rows in the expenses state.
    //This means that new data is availible.
    if (rows.toString() !== expenses.toString()) { 

        //Format the amounts to use dots instead of decimal point
        const categoryExpenses = rows.map(row => {
            const amountFormated = Number(row.amount.replace('.', '').replace(',', '.'));
            return {'category': row.category, 'amount': amountFormated};
        });
       
        setExpenses(rows);

        const categoryExpensesFormated = []; //An array to values in the format {category: amount}
        
        for (let row of categoryExpenses) {
            
            //If the user hasn't provided a category, make the transactions category 'Other'
            if (row.category === '') {
                row.category = 'Other';
            }

            const sameCategoryIndex = categoryExpensesFormated.findIndex(elem => row.category === elem.category);

            //If categoryExpensesFormated is empty, push the row and continue
            if(categoryExpensesFormated.length === 0) {
                categoryExpensesFormated.push({...row});
                continue;
            }

            
            if (sameCategoryIndex !== -1) { //If the category from the transaction already is in categoryExpensesFormated, add the amount to that category
                categoryExpensesFormated[sameCategoryIndex].amount += row.amount;
            } else { //If the category from the transaction isn't in categoryExpensesFormated, add the row to categoryExpensesFormated
                categoryExpensesFormated.push({...row});
            }

           
        }
        
        //Gather all categories
        const tempCategories = categoryExpensesFormated.map((elem) => {
            return elem.category;
        });
        
        //Gather all amounts
        const tempAmounts = categoryExpensesFormated.map((elem) => {
            return elem.amount;
        });

        setCategories(tempCategories);
        setAmounts(tempAmounts);

        //Configure the pie chart data
        pieChart.data.datasets[0].data = tempAmounts;
        pieChart.data.labels = tempCategories;
        pieChart.data.datasets[0].backgroundColor = tempCategories.map((elem, index) => {
            const color = generateRandomColor();
            return color;
        })
        pieChart.data.indexLabelPlacement = true;

        //Update the pie chart
        pieChart.update()

    }
    
    useEffect(() => {
        //Configure the pie chart options
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