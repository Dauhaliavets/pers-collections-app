import React from 'react'
import { SearchResponse } from '../../models/searchResponse.model'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { SearchItemHighlights } from './SearchItemHighlights'
import { useNavigate } from 'react-router-dom'

interface ISearchListProps {
  data: SearchResponse[]
}

export const SearchList: React.FC<ISearchListProps> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <Stack>
      {data.map((item) => (
        <Card key={item._id} sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant='h5' component='div'>
              Item: {item.title}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
              Which coincided
            </Typography>
            <SearchItemHighlights highlights={item.highlights} />
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
      ))}
    </Stack>
  )
}
