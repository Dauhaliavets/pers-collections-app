/* eslint-disable camelcase */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCollections } from '../store/slices/collectionsSlice/collectionsSlice'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'

export const Collections: React.FC = () => {
  const { isAuth, user } = useAppSelector((state) => state.auth)
  const { collections, isLoading, error } = useAppSelector((state) => state.collections)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper title='All Collections' collections={collections} />
      {isAuth && (
        <CollectionsWrapper
          title='My Collections'
          collections={collections.filter((collection) => collection.ownerId === user?.id)}
        >
          <Button variant='contained' onClick={() => navigate('create')}>
            Create New Collection
          </Button>
        </CollectionsWrapper>
      )}

      {isLoading && <CircularProgress />}
      {error && <Alert severity='error'>{error.message}</Alert>}
    </Box>
  )
}
