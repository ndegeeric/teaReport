import React from 'react';
// import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ weights, month }) => {
  // const i = weights.map((weights, index) => index + 1)
  // let months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  // let monthName = months[month['month']]
  // var selectedMonthName = months[value('month')]-1;
  // console.log(weights, month);
  return (
    <>
    <ReactApexChart 
        series= {[{
            name: 'Weight',
            data: weights          
        }]}
        type='bar'
        height={200}
        options={{
            chart: {
                type: 'bar',
                toolbar: { show: false, },
              },
              xaxis: {
                categories: month
                // categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
              },
              yaxis: {
                title: {
                    text: 'Kilograms',
                },
              },
              colors: ['#475be8', '#cfc8ff'],
              plotOptions: {
                bar: {
                    borderRadius: 2,
                    horizontal: false,
                    columnWidth: '55%',
                }
              },
              dataLabels: {
                enabled: false,
              },
              grid: {
                show: false,
              },
              stroke: {
                colors: ['transparent'],
                width: 4,
              },
              fill: {
                opacity: 1,
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
              }, 
                tooltip: {
                    y: {
                        formatter(val) {
                            return `${val} kgs`;
                        },
                    },
                },
              
            }
        }
    />
    </>
  )
} 

export default BarChart