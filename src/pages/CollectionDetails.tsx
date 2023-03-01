import * as React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchItemsByCollectionId } from '../store/slices/itemsSlice/itemsSlice'
import { deleteCollectionById } from '../store/slices/collectionsSlice/collectionsSlice'
import { Role } from '../models/User.model'
import ImageNotFound from '../assets/image-not-found.jpg'
import { Spinner } from '../components/shared/spinner/Spinner'
import { PrevPageButton } from '../components/shared/buttons/PrevPageButton'
import { CollectionItemsTable } from '../components/collectionItemsTable/CollectionItemsTable'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { FormattedMessage } from 'react-intl'

export function CollectionDetails() {
  const { collectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const { items, isLoading: isLoadingItems, error } = useAppSelector((state) => state.items)
  const { collections, isLoading: isLoadingCollections } = useAppSelector(
    (state) => state.collections,
  )
  const [currentCollection] = collections.filter((collection) => collection._id === collectionId)

  React.useEffect(() => {
    if (collectionId) {
      dispatch(fetchItemsByCollectionId({ id: collectionId }))
    }
  }, [])

  const onDeleteCollection = () => {
    if (user && collectionId) {
      dispatch(deleteCollectionById({ id: collectionId, token: user.token }))
      navigate(-1)
    }
  }

  const checkOwnerOrAdmin = (): boolean => {
    if (user) {
      return user.id === currentCollection.ownerId || user.role === Role.Admin
    }
    return false
  }

  const isOwnerOrAdmin = checkOwnerOrAdmin()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <PrevPageButton />
        {isOwnerOrAdmin && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Button variant='contained' onClick={() => navigate('edit')}>
              <FormattedMessage id='app.buttons.editCollection' />
            </Button>
            <IconButton aria-label='delete' onClick={onDeleteCollection}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          flexGrow: 1,
          alignItems: 'center',
        }}
      >
        <Typography variant='h5'>{currentCollection.title}</Typography>
        <img
          src={currentCollection.imageUrl || ImageNotFound}
          alt={currentCollection.imageUrl ? currentCollection.title : 'Not Found Image'}
          style={{ width: '90%', height: '300px', objectFit: 'contain' }}
        />
        <ReactMarkdown>{currentCollection.description}</ReactMarkdown>
      </Box>
      {(isLoadingItems || isLoadingCollections) && <Spinner />}
      {error && <Alert severity='error'>{error.message}</Alert>}
      <Button variant='contained' onClick={() => navigate('createItem')} disabled={!isOwnerOrAdmin}>
        <FormattedMessage id='app.buttons.addItem' />
      </Button>
      {items && (
        <CollectionItemsTable
          items={items}
          currentCollection={currentCollection}
          isOwnerOrAdmin={isOwnerOrAdmin}
        />
      )}
    </Box>
  )
}
