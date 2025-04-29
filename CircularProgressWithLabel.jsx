import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const CircularProgressWithLabel = ({ label = "Cargando..." }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
            <Typography variant="caption" component="div" color="text.secondary" sx={{ mt: 1 }}>
                {label}
            </Typography>
        </Box>
    )
}

export default CircularProgressWithLabel
