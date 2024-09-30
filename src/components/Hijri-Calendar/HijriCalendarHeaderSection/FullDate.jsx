import React from 'react'
import { Box, Typography } from '@mui/material';

export default function FullDate({ hijriDate, gregorianDate }) {
    return (
        <Box style={{
          margin:'auto'
        }} sx={{textAlign: 'center', mb: 2}}>
            <Typography
                variant="h3"

                sx={{
                    color: 'primary.main',
                    margin:'auto',
                    mb: 2,
                    textAlign:'center',
                }}>
                {hijriDate&&hijriDate.day} {hijriDate&&hijriDate.month} {hijriDate&&hijriDate.year}
            </Typography>

            <Typography
                variant="h4">
                {hijriDate&&hijriDate.dateInNumbers} / {gregorianDate&&gregorianDate.dateInNumbers}
            </Typography>
        </Box>
    )
}
