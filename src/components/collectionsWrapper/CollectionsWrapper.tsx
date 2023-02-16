import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ICollection } from '../../store/slices/collectionsSlice/model'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

interface ICollectionsWrapperProps {
  title: string
  collections: ICollection[]
  children?: React.ReactNode
}

export const CollectionsWrapper: React.FC<ICollectionsWrapperProps> = ({
  title,
  collections,
  children,
}) => {
  const navigate = useNavigate()

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
    </>
  )
}
