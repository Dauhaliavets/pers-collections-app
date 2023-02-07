import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export const Spinner = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF33',
        position: 'absolute',
        top: '0',
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={50} />
    </Box>
  )
}
