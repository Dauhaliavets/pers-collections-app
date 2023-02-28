import React from 'react'
import { useAppSelector } from '../store'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'

export const Collections = () => {
  const { collections } = useAppSelector((state) => state.collections)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper title='All Collections' collections={collections}></CollectionsWrapper>
    </Box>
  )
}
