"use client"
import Grid from '@mui/material/Grid2';
import Link from 'next/link';

const HeaderNav = () => {

    return (
        <Grid container p={2} sx={{ height: 50, background: '#f0f0f0' }} spacing={6}>
            <Grid sx={{
                position: 'relative',
                '&:hover': {
                    color: '#0095ff',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -4,
                        height: '2px',
                        backgroundColor: '#0095ff',
                    },
                },
            }}>
                <Link href="/">Home</Link>
            </Grid>
            <Grid sx={{
                position: 'relative',
                '&:hover': {
                    color: '#0095ff',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: -4,
                        height: '2px',
                        backgroundColor: '#0095ff',
                    },
                },
            }}>
                <Link href="/upload">Upload</Link>
            </Grid>
        </Grid>
    )
}

export default HeaderNav