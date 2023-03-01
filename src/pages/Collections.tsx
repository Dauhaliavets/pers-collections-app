import React from 'react'
import { useAppSelector } from '../store'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import Box from '@mui/material/Box'
import { useIntl } from 'react-intl'

export const Collections = () => {
  const intl = useIntl()
  const { collections } = useAppSelector((state) => state.collections)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CollectionsWrapper
        title={intl.formatMessage({ id: 'app.main.titles.allCollections' })}
        collections={collections}
      ></CollectionsWrapper>
    </Box>
  )
}
