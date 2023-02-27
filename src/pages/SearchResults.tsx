import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import { fetchItemsByQuery } from '../store/slices/itemsSlice/itemsSlice'
import { SearchList } from '../components/searchList/SearchList'
import { Spinner } from '../components/shared/spinner/Spinner'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const SearchResults = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get('query')
  const { items, isLoading } = useAppSelector((state) => state.items)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    if (query) {
      dispatch(fetchItemsByQuery({ query }))
    }
  }, [query])

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', position: 'relative' }}>
      {isLoading && <Spinner />}
      <Typography>
        {items.length} results for &quot;{query}&ldquo;
      </Typography>
      {!!items.length && <SearchList data={items} />}
    </Box>
  )
}
