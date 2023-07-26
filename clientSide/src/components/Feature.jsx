import React, { useEffect } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import {  ArrowCircleDownOutlined, ArrowCircleUpOutlined } from '@mui/icons-material';


const Feature = ({ title, value, icon, subsValue, percentage, addStyles, setIsIncrease, isIncrease }) => {

  
  // console.log(percentage, percentage > 0)
  useEffect(() => {
    if(percentage > 0) {      
      setIsIncrease(true);
    } else {
      setIsIncrease(false);
    }
  },[percentage,setIsIncrease]);

  return (
    <Box className={`flex flex-col py-6 md:py-3 px-4 md:px-0 w-[90vw] md:w-auto items-center justify-around cursor-pointer bg-gray-100 rounded-lg ${addStyles}`}>
      <Typography fontSize={16} fontWeight={600} color='#111420' >{ title }</Typography>
      <Typography fontSize={10} fontWeight={400} color='#808191' sx={{ marginBottom: '10px', md:{ marginBottom: 0 }}} >{ subsValue }</Typography>
        <Box flexDirection='row' alignItems='center' display='flex' flexWrap='wrap' gap={4}>
          <Stack>
            {/* <Typography fontSize={16} fontWeight={600} color='#' >{ title }</Typography> */}
            <Typography fontSize={22} fontWeight={700} color='#111420' >{ value }</Typography>
          </Stack>
          <Stack display='flex' alignItems='center'>
            <Typography fontSize={10} fontWeight={400} color={`${ isIncrease ? '#26ca71': '#ff3d3d'}`} >{ `${ percentage }%` }</Typography>
            { isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} /> }
            {/* <PieChart height={50} value={ subsValue } series={[ 60, 40]} colors={['#475be8', '#e4e8ef']} /> */}
          </Stack>
        </Box>

            {/* <div className="text-center w-full text-sm ">{title}</div>
            <div className="flex items-center justify-evenly w-full py-1">
                <div className="text-2xl font-bold"><p> {value}</p></div>
                <div className="flex flex-col gap-1">
                  <p className='text-xs text-lime-900'>{percentage}</p>
                  {icon}
                </div>
            </div>
            <div className="text-center font-semibold"><p>{subsValue}</p></div> */}
    </Box>
  )
}

export default Feature