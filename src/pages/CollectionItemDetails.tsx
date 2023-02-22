import React from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { ItemDetailsHeader } from '../components/itemDetails/ItemDetailsHeader'
import { ItemDetailsTable } from '../components/itemDetails/ItemDetailsTable'
import { CommentForm } from '../components/itemDetails/CommentForm'
import { CommentsList } from '../components/itemDetails/CommentsList'
import Box from '@mui/material/Box'

export const CollectionItemDetails = () => {
  const { itemId } = useParams()
  const { items } = useAppSelector((state) => state.items)
  const [currentItem] = items.filter((item) => item._id === itemId)

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
      <ItemDetailsHeader currentItem={currentItem} />
      <ItemDetailsTable currentItem={currentItem} />
      <CommentForm />
      <CommentsList currentItem={currentItem} />
    </Box>
  )
}
