/* eslint-disable camelcase */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchCollections } from '../store/slices/collectionsSlice/collectionsSlice'
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material'

export const Collections: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth)
  const { collections, isLoading, error } = useAppSelector((state) => state.collections)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchCollections())
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' component='h3'>
          Collections
        </Typography>
        {isAuth && (
          <Button variant='contained' onClick={() => navigate('create')}>
            Create New Collection
          </Button>
        )}
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {collections.map((collection) => (
          <Grid item xs={6} sm={4} md={4} key={collection._id}>
            <Card sx={{ maxWidth: '100%' }} onClick={() => navigate(`${collection._id}`)}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='200'
                  image={collection.imageUrl}
                  alt='collection image'
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {collection.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {collection.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isLoading && <CircularProgress />}
      {error && <Alert severity='error'>{error.message}</Alert>}
    </Box>
  )
}
