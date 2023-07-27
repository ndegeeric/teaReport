import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import {  ArrowCircleDownOutlined, ArrowCircleUpOutlined } from '@mui/icons-material';


const Feature = ({ title, value, subsValue, percentage, addStyles, isExpense }) => {

  return (
    <Box className={`flex flex-col py-6 md:py-3 px-4 md:px-0 w-[90vw] md:w-auto items-center justify-around cursor-pointer bg-gray-100 rounded-lg ${addStyles}`}>
      <Typography fontSize={16} fontWeight={600} color='#111420' >{ title }</Typography>
      <Typography fontSize={10} fontWeight={400} color='#808191' sx={{ marginBottom: '10px', md:{ marginBottom: 0 }}} >{ subsValue }</Typography>
        <Box flexDirection='row' alignItems='center' display='flex' flexWrap='wrap' gap={4}>
          <Stack>
            <Typography fontSize={22} fontWeight={700} color='#111420' >{ value }</Typography>
          </Stack>
          <Stack display='flex' alignItems='center'>
            <Typography fontSize={10} fontWeight={400} color={isExpense ? `${ percentage > 0 ? `#ff3d3d`:`#26ca71` }` : `${`${ percentage > 0 ? `#26ca71` : `#ff3d3d` }` }`}>{`${percentage}%`}</Typography>
            { isExpense ? percentage > 0 ? <ArrowCircleUpOutlined sx={{ color:'#ff3d3d', }} /> : <ArrowCircleDownOutlined sx={{ color:'#26ca71' }} /> : percentage > 0 ? <ArrowCircleUpOutlined sx={{ color:'#26ca71', }} /> : <ArrowCircleDownOutlined sx={{ color:'#ff3d3d' }} /> }
          </Stack>
        </Box>
    </Box>
  )
}

export default Feature