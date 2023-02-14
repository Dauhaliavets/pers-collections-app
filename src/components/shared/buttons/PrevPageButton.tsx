import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'

export const PrevPageButton = () => {
  const navigate = useNavigate()
  return (
    <IconButton aria-label='show' color='primary' onClick={() => navigate(-1)}>
      <ArrowBackIcon fontSize='small' />
    </IconButton>
  )
}
