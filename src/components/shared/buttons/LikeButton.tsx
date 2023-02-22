import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton'

interface ILikeButtonProps {
  isLiked: boolean
  onClick: () => void
}

export const LikeButton: React.FC<ILikeButtonProps> = ({ isLiked, onClick }) => {
  return (
    <IconButton aria-label='show' color='primary' onClick={onClick}>
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  )
}
