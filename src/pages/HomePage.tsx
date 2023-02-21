import React from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCollections } from '../store/slices/collectionsSlice/collectionsSlice'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'

export const HomePage: React.FC = () => {
  const { collections } = useAppSelector((state) => state.collections)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      {/* Cloud tags*/}
      <CollectionsWrapper title='All Collections' collections={collections} />
    </Box>
  )
}
