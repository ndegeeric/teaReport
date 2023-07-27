import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';

import { BarChart } from '../components';
import { Box, Stack, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { getRangeData } from '../actions/rangeData';

const PickingsAnalysis = () => {
    const dispatch = useDispatch();
    const now = new Date();
    // const year = now.getFullYear();
    // const monthYr = now.getMonth() + 1;
    // monthYr <= 6 ? new Date(` 07-01-${ year - 1 } 00:00:00 GMT`) : new Date(` 07-01-${ year } 00:00:00 GMT` )
    const [startDate, setStartDate] = useState(now - 365 * 24 * 60 * 60 * 1000);
    const [endDate, setEndDate] = useState(new Date());

    const  data  = useSelector( state => state.rangeData);

    let weights =  data.map(item => item.weight);
    
    const categories = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let months = data.map(item => categories[item._id - 1] );
    
    const onChange = async(dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    useEffect(()=> {
        dispatch(getRangeData({ startDate: startDate, endDate: endDate }));
    },[startDate,endDate, dispatch]);
  return (
    <Box p={2} flex={1} bgcolor='#fcfcfc' flexDirection='column' borderRadius='15px'>
        <Stack direction='row' flex={1} alignItems='center' justifyContent='space-between' >
            <Typography fontSize={18} fontWeight={600} color='#11142d'>Monthly Totals</Typography>
            <Stack direction='row' fontSize={12} fontWeight={400} color='#11142d'> 
            <DatePicker
            className='cursor-pointer outline-none'
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
                <ExpandMore sx={{ fontSize: 16 }} />
            </Stack>
        </Stack>
        <BarChart
            weights={weights}
            month={months}
        />
    </Box>
  )
}

export default PickingsAnalysis;