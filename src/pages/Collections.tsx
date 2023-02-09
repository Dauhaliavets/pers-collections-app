/* eslint-disable camelcase */
import { Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Collections: React.FC = () => {
  const navigate = useNavigate()

  return (
    <>
      <Typography variant='h4' component='h3'>
        Collections
      </Typography>
      <Button variant='contained' onClick={() => navigate('create')}>
        Create New Collection
      </Button>
    </>
  )
}
