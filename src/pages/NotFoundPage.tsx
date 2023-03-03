import Box from '@mui/material/Box'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import Typography from '@mui/material/Typography'

export const NotFoundPage = () => {
  return (
    <Box sx={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant='h4' component='h4' align='center'>
        <FormattedMessage id='app.nofFoundPage.text' />
      </Typography>
    </Box>
  )
}
