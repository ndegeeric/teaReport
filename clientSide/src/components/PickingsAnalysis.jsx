import React from 'react';

import { BarChart } from '../components';
import { Box, Stack, Typography } from '@mui/material';
import { CalendarMonthOutlined, ExpandMore } from '@mui/icons-material';

const PickingsAnalysis = ({ bodyData }) => {
    let weights = [];
    bodyData.map(pick => weights.push(pick.weight));
    // console.log(weights);
  return (
    <Box p={2} flex={1} bgcolor='#fcfcfc' flexDirection='column' borderRadius='15px'>
        <Stack direction='row' flex={1} alignItems='center' justifyContent='space-between' >
            <Typography fontSize={18} fontWeight={600} color='#11142d'>Monthly Totals</Typography>
            <Typography fontSize={12} fontWeight={400} color='#11142d'><CalendarMonthOutlined sx={{ fontSize: 16,  }}/>1 July 2023 - 17 July 2023<ExpandMore sx={{ fontSize: 16,  }} /></Typography>
        </Stack>
        {/* <Stack my='10px' direction='row' gap={4} flexWrap='wrap'>
            <Stack direction='row' alignItems='center' gap={1}>
                <ArrowCircleUpRounded sx={{ fontSize: 25, color: '#475be' }} />
                <Stack>
                    <Typography fontSize={15} color='#475be8'>0.8%</Typography>
                    <Typography fontSize={12} color='#808191'>than last month</Typography>
                </Stack>
            </Stack>
        </Stack> */}
        <BarChart
            weights={weights}
        />
    </Box>
  )
}

export default PickingsAnalysis