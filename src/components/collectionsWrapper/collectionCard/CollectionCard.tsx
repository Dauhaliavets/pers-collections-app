import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ICollectionCardProps } from './collectionCardProps'
import ImageNotFound from '../../../../src/assets/image-not-found.jpg'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

export const CollectionCard: React.FC<ICollectionCardProps> = ({ collection }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{ maxWidth: '100%' }}
      onClick={() => navigate(`/collections/${collection._id}`, { relative: 'path' })}
    >
      <CardActionArea>
        <CardMedia
          component='img'
          height='200'
          image={collection.imageUrl || ImageNotFound}
          alt='collection image'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {collection.title}
          </Typography>
          <Typography variant='subtitle2' color='text.secondary'>
            {collection.topic}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
