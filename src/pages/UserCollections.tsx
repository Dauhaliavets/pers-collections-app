import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../store'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const UserCollections = () => {
  const { user } = useAppSelector((state) => state.auth)
  const { collections } = useAppSelector((state) => state.collections)
  const navigate = useNavigate()

  const userCollections = collections.filter((collection) => collection.ownerId === user?.id)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper title='My Collections' collections={userCollections}>
        <Button variant='contained' onClick={() => navigate('create')}>
          Create New Collection
        </Button>
      </CollectionsWrapper>
    </Box>
  )
}
