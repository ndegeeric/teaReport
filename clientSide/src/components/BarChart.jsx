import React from 'react';
// import { Box } from '@mui/material';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
  return (
    <>
    <ReactApexChart 
        series= {[{
            name: 'Weight',
            data: [30, 40, 45, 50, 49, 60, 70, 91]          
        }]}
        type='bar'
        height={200}
        options={{
            chart: {
                type: 'bar',
                toolbar: { show: false, },
              },
              xaxis: {
                categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
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