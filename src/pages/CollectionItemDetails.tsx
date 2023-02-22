import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { updateItemFromSocket } from '../store/slices/itemsSlice/itemsSlice'
import { ItemDetailsTable } from '../components/itemDetails/ItemDetailsTable'
import { CommentForm } from '../components/itemDetails/CommentForm'
import { CommentsList } from '../components/itemDetails/CommentsList'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import io from 'socket.io-client'
import { API_URL } from '../constants/api'
import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'

const socket = io(API_URL)

export const CollectionItemDetails = () => {
  const { itemId } = useParams()
  const { items } = useAppSelector((state) => state.items)
  const [currentItem] = items.filter((item) => item._id === itemId)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    socket.on('new-comment', (data) => dispatch(updateItemFromSocket(data)))

    return () => {
      socket.off('new-comment')
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <PrevPageButton />
      </Box>
      <Typography align='center'>Collection Item Details</Typography>
      <ItemDetailsTable currentItem={currentItem} />
      <Typography align='center'>Comments</Typography>
      <CommentForm itemId={itemId} />
      <CommentsList currentItem={currentItem} />
    </Box>
  )
}
