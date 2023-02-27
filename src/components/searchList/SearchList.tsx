import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ISearchListProps } from './searchList.types'
import { SearchItemHighlights } from './SearchItemHighlights'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

export const SearchList: React.FC<ISearchListProps> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant='h5' component='div'>
                Item: {item.title}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                Which coincided
              </Typography>
              {item.highlights && <SearchItemHighlights highlights={item.highlights} />}
            </CardContent>
            <CardActions>
              <Button
                size='small'
                onClick={() =>
                  navigate(`/collections/${item.collectionId}/items/${item._id}`, {
                    relative: 'path',
                  })
                }
              >
                Show More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
