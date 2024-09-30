import { Box } from '@mui/material'
import React, { memo } from 'react'
import './style.css';
import image from "../../../../../assets/images/ayah_number.jpg"

function AyahNumber({ number, isActived }) {
    return (
        // <div className='ayaNumber_container'>
        //   <span>{number}</span>
        // </div>

            <span className={`ayah_number ${isActived ? "active":""}`}>

            <img src={image} alt="" />
            <span className='ayah_number_counter'>{number}</span>
            </span>
        
        // <Box component='span' sx={{
        //     color: 'text.primary',
        //     py: '8px',
        //     px: '12px',
        //     fontSize: '0.9rem',
        //     fontWeight: '600',
        //     mx: '5px',
        //     width:'8%',
        //     marginTop:"8px",
        //     backgroundImage: 'url(svg/bf29ebc4-a5ab-4e76-84aa-8a5c6a05fedf-removebg-preview.png)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundPosition: 'center',
        //     filter: isActived ? 'invert(1)' : 'invert(0)',
        // }}>
        //     {number}
        //     {/* <div>{number}</div> */}
        // </Box>
    )
}

export default memo(AyahNumber)
