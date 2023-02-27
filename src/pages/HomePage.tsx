import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCollections } from '../store/slices/collectionsSlice/collectionsSlice'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'
import { fetchItems } from '../store/slices/itemsSlice/itemsSlice'
import { CloudTags } from '../components/cloudTags/CloudTags'

export const HomePage: React.FC = () => {
  const { collections } = useAppSelector((state) => state.collections)
  const { items } = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchItems())
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      {/* Cloud tags*/}
      <CloudTags />
      <CollectionsWrapper title='All Collections' collections={collections} />
    </Box>
  )
}
