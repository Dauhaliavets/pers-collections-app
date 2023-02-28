import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const UserCollections = () => {
  const { ownerId } = useParams()
  const { collections } = useAppSelector((state) => state.collections)
  const navigate = useNavigate()

  const userCollections = collections.filter((collection) => collection.ownerId === ownerId || '')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper title='Collections' collections={userCollections}>
        <Button
          variant='contained'
          onClick={() => navigate('/collections/create', { relative: 'path', state: { ownerId } })}
        >
          Create New Collection
        </Button>
      </CollectionsWrapper>
    </Box>
  )
}
