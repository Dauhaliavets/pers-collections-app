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
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteCollectionById } from '../store/slices/collectionsSlice/collectionsSlice'

export function CollectionDetails() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { collections, isLoading: isLoadingCollections } = useAppSelector(
    (state) => state.collections,
  )
  const { items, isLoading: isLoadingItems, error } = useAppSelector((state) => state.items)

  const [currentCollection] = collections.filter((collection) => collection._id === collectionId)

  console.log('currentCollection: ', currentCollection)

  React.useEffect(() => {
    if (collectionId) {
      dispatch(fetchItemsByCollectionId({ id: collectionId }))
    }
  }, [])

  const onDeleteCollection = () => {
    if (user && collectionId) {
      dispatch(deleteCollectionById({ id: collectionId, token: user.token })).then((data) => {
        console.log('data: ', data)
        console.log('REDIRECT TO collections')
        navigate('collections', { relative: 'path' })
      })
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Button variant='contained' onClick={() => navigate('edit')}>
            Edit collection
          </Button>
          <IconButton aria-label='delete' onClick={onDeleteCollection}>
            <DeleteIcon />
          </IconButton>
        </Box>
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
      {(isLoadingItems || isLoadingCollections) && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      <Button variant='contained' onClick={() => navigate('createItem')}>
        Add new item
      </Button>
      {items && <CollectionItemsTable items={items} currentCollection={currentCollection} />}
    </Box>
  )
}
