import { Box } from '@mui/material'
import { Link } from 'react-router-dom'

export default function WebLogo() {
    return (
        <Link to="/">
            <Box
                ml={2}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                }}>
                <Box
                    component='img'
                    src='/images/logo2 (2).png'
                    sx={{
                        // width: 70,
                        height:70,
                        filter: 'drop-shadow(2px 2px 2px #170f052e)',
                    }}
                    alt='logo'
                />
            </Box>
        </Link>
    )
}
