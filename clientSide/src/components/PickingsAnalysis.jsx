import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import { BarChart } from '../components';
import { Box, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const PickingsAnalysis = ({ bodyData }) => {
    // const [inputData, setInputData] = useState({startDate: '', endDate: '',});
    const [startDate, setStartDate] = useState(new Date()- new Date(365*24*60*60*1000));
    const [endDate, setEndDate] = useState(new Date());

    let weights = [];
    bodyData.map(pick => weights.push(pick.weight));

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }
    console.log(startDate,endDate);
  return (
    <Box p={2} flex={1} bgcolor='#fcfcfc' flexDirection='column' borderRadius='15px'>
        <Stack direction='row' flex={1} alignItems='center' justifyContent='space-between' >
            <Typography fontSize={18} fontWeight={600} color='#11142d'>Monthly Totals</Typography>
            <Stack direction='row' fontSize={12} fontWeight={400} color='#11142d'> 
            <DatePicker
            // id={startDateId}
            selected={startDate}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            placeholderText={`${startDate} - ${endDate}`}
            // dateFormat={displayFormat}
            onChange={onChange}
            // locale={selectLocale(locale)}
            // customInput={<CustomInput />}
            />
            {/* <input className='cursor-pointer outline-none border-none bg-transparent' value={`${inputData.startDate} - ${inputData.endDate}`} onChange={onChange} type="date" name="startDate" id="" /> */}
            <ExpandMore sx={{ fontSize: 16,  }} />
            </Stack>
        </Stack>
        <BarChart
            weights={weights}
        />
    </Box>
  )
}

export default PickingsAnalysis;