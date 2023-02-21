import React from 'react'
import { useAppSelector } from '../../store'
import { ICollectionsWrapperProps } from './collectionWrapperProps'

import { Spinner } from '../shared/spinner/Spinner'
import { CollectionCard } from './collectionCard/CollectionCard'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

export const CollectionsWrapper: React.FC<ICollectionsWrapperProps> = ({
  title,
  collections,
  children,
}) => {
  const { isLoading, error } = useAppSelector((state) => state.collections)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h4' component='h3'>
          {title}
        </Typography>
        {children}
      </Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {collections.map((collection) => (
          <Grid item xs={6} sm={4} md={4} key={collection._id}>
            <CollectionCard collection={collection} />
          </Grid>
        ))}
      </Grid>
      {isLoading && <Spinner size={100} />}
      {error && <Alert severity='error'>{error.message}</Alert>}
    </>
  )
}
