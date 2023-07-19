import React from 'react';

import { BarChart } from '../components';
import { Box, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const PickingsAnalysis = ({ bodyData }) => {
    let weights = [];
    bodyData.map(pick => weights.push(pick.weight));
    // console.log(weights);
  return (
    <Box p={2} flex={1} bgcolor='#fcfcfc' flexDirection='column' borderRadius='15px'>
        <Stack direction='row' flex={1} alignItems='center' justifyContent='space-between' >
            <Typography fontSize={18} fontWeight={600} color='#11142d'>Monthly Totals</Typography>
            <Typography fontSize={12} fontWeight={400} color='#11142d'> 
            <input className='cursor-pointer outline-none border-none bg-transparent' type="date" name="startDate" id="" />
            <ExpandMore sx={{ fontSize: 16,  }} />
            </Typography>
        </Stack>
        <BarChart
            weights={weights}
        />
    </Box>
  )
}

export default PickingsAnalysis;