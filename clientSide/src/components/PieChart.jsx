import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, Stack } from '@mui/material';

const PieChart = ({ picks, title, value, series, colors }) => {
  return (
    <Box pl={3.5} position={'relative'}>
      <Typography marginBottom='10px' fontSize={14} color='#808191'>{ title }</Typography>
      <Stack direction='column' display={'flex'} justifyContent={'center'} alignItems={'center'}>
        {/* <Typography  position={'absolute'} top={'50%'} left={'50%'} fontSize={24} color='#11142d' fontWeight={700} >{ value }</Typography> */}
        <p className={`absolute top-[50%] translate-y-[-25%] text-xl font-[700] ${ title ==='Expenses' ? `text-[#ff7a63]` : 'text-[#a4f264]' }`}>{ value }</p>
        <ReactApexChart 
            options={{
              chart: { type: 'donut'},
              colors,
              legend: { show: false },
              dataLabels: { enabled: false },
              labels: ['Income', 'Expenses'],
            }}
            series={ series }                
            type='donut'
            width='220px'
        />
      </Stack>
    </Box>
  )
}

export default PieChart