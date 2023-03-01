import React from 'react'
import { useAppDispatch } from '../store'
import { fetchCollections } from '../store/slices/collectionsSlice/collectionsSlice'
import { fetchItems } from '../store/slices/itemsSlice/itemsSlice'
import { CollectionsWrapper } from '../components/collectionsWrapper/CollectionsWrapper'
import { CloudTags } from '../components/cloudTags/CloudTags'
import { ItemsList } from '../components/itemsList/ItemsList'
import { useSortedItems } from '../hooks/useSortedItems'
import { useSortedCollections } from '../hooks/useCollections'
import Box from '@mui/material/Box'
import { QUANTITY_ON_HOME_PAGE } from '../constants/homePage'
import { FormattedMessage, useIntl } from 'react-intl'
import Typography from '@mui/material/Typography'

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const intl = useIntl()

  React.useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchItems())
  }, [])

  const { mostLargestCollections } = useSortedCollections()
  const { lastCreatedItems } = useSortedItems()

  const collections = mostLargestCollections.slice(0, QUANTITY_ON_HOME_PAGE)
  const items = lastCreatedItems.slice(0, QUANTITY_ON_HOME_PAGE)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: '20px' }}>
      <CloudTags title={intl.formatMessage({ id: 'app.main.titles.cloudTags' })} />
      <Typography variant='h5' component='h4'>
        <FormattedMessage id='app.main.titles.lastCreatedItems' />
      </Typography>
      <ItemsList data={items} />
      <CollectionsWrapper
        title={intl.formatMessage({ id: 'app.main.titles.mostLargestCollections' })}
        collections={collections}
      />
    </Box>
  )
}
