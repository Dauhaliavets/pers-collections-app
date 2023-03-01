import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../store'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { FormattedMessage, useIntl } from 'react-intl'

export const UserCollections = () => {
  const { ownerId } = useParams()
  const { collections } = useAppSelector((state) => state.collections)
  const navigate = useNavigate()
  const intl = useIntl()

  const userCollections = collections.filter((collection) => collection.ownerId === ownerId || '')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper
        title={intl.formatMessage({ id: 'app.main.titles.userCollections' })}
        collections={userCollections}
      >
        <Button
          variant='contained'
          onClick={() => navigate('/collections/create', { relative: 'path', state: { ownerId } })}
        >
          <FormattedMessage id='app.buttons.createCollection' />
        </Button>
      </CollectionsWrapper>
    </Box>
  )
}
