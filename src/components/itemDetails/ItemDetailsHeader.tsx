import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { updateItemById } from '../../store/slices/itemsSlice/itemsSlice'
import { IItemDetailsHeaderProps } from './itemDetails.types'
import { PrevPageButton } from '../shared/buttons/PrevPageButton'
import { LikeButton } from '../shared/buttons/LikeButton'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FormattedMessage } from 'react-intl'

export const ItemDetailsHeader: React.FC<IItemDetailsHeaderProps> = ({ currentItem }) => {
  const { itemId } = useParams()
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const checkLikes = () => {
    if (user && currentItem) {
      return currentItem.likes.includes(user.id)
    }
    return false
  }

  const isLiked = checkLikes()

  const onChangeLike = () => {
    if (user && itemId) {
      let updatedLikes: string[] = []
      if (currentItem.likes.includes(user.id)) {
        updatedLikes = currentItem.likes.filter((like) => like !== user.id)
      } else {
        updatedLikes = [...currentItem.likes, user.id]
      }
      dispatch(
        updateItemById({
          id: itemId,
          token: user.token,
          newBody: { likes: updatedLikes },
        }),
      )
    }
  }

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        <LikeButton isLiked={isLiked} onClick={onChangeLike} />
      </Box>
      <Typography align='center' variant='h5' component='h4'>
        <FormattedMessage id='app.collectionItemDetails.title' />
      </Typography>
    </>
  )
}
