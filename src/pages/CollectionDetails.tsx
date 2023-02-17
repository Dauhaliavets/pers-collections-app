import * as React from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import ReactMarkdown from 'react-markdown'
import { fetchItemsByCollectionId } from '../store/slices/itemsSlice/itemsSlice'

import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'
import { CollectionItemsTable } from '../components/collectionItemsTable/CollectionItemsTable'
import { Spinner } from '../components/shared/spinner/Spinner'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function CollectionDetails() {
  const { collectionId } = useParams()
  const [currentCollection] = useAppSelector((state) =>
    state.collections.collections.filter((collection) => collection._id === collectionId),
  )
  const { items, isLoading, error } = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    dispatch(fetchItemsByCollectionId({ id: collectionId as string }))
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        <Button variant='contained' onClick={() => navigate('edit')}>
          Edit collection
        </Button>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, alignItems: 'center' }}
      >
        <Typography variant='h5'>{currentCollection.title}</Typography>
        <img
          src={currentCollection.imageUrl}
          alt={currentCollection.title}
          style={{ width: '90%', height: '300px', objectFit: 'contain' }}
        />
        <ReactMarkdown>{currentCollection.description}</ReactMarkdown>
      </Box>
      {isLoading && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      <Button variant='contained' onClick={() => navigate('createItem')}>
        Add new item
      </Button>
      {items && <CollectionItemsTable items={items} currentCollection={currentCollection} />}
    </Box>
  )
}
