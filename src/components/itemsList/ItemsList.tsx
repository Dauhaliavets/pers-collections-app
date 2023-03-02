import React from 'react'
import { useNavigate } from 'react-router-dom'
import { transformDate } from '../../utils/transformDate'
import { ItemHighlights } from './ItemHighlights'
import { IItemsListProps } from './itemsList.types'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import { FormattedMessage } from 'react-intl'

export const ItemsList: React.FC<IItemsListProps> = ({ data }) => {
  const navigate = useNavigate()

  return (
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant='h5' component='div' align='center' gutterBottom>
                {item.title}
              </Typography>
              {item.highlights && (
                <>
                  <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                    <FormattedMessage id='app.itemsList.card.subtitle' />
                  </Typography>
                  <ItemHighlights highlights={item.highlights} />
                </>
              )}
              <Typography sx={{ fontSize: 14 }} color='text.secondary' align='right'>
                {transformDate(item.createdAt)}
              </Typography>
            </CardContent>
            <CardActions sx={{ padding: '16px', justifyContent: 'center' }}>
              <Button
                variant='outlined'
                size='small'
                onClick={() =>
                  navigate(`/collections/${item.collectionId}/items/${item._id}`, {
                    relative: 'path',
                  })
                }
              >
                <FormattedMessage id='app.itemsList.card.button' />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
