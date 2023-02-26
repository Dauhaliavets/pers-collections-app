import React from 'react'
import { useLocation } from 'react-router-dom'
import { searchItemsByQuery } from '../api/searchItems'
import { SearchList } from '../components/searchList/SearchList'
import { SearchResponse } from '../models/searchResponse.model'
import { Spinner } from '../components/shared/spinner/Spinner'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const SearchResults = () => {
  const [results, setResults] = React.useState<SearchResponse[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')

  React.useEffect(() => {
    if (query) {
      setLoading(true)
      searchItemsByQuery(query).then((results) => {
        setLoading(false)
        console.log('results: ', results)
        setResults(results)
      })
    } else {
      setResults([])
      setLoading(false)
    }
  }, [query])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {loading && <Spinner />}
      <Typography>
        {results.length} results for &quot;{query}&ldquo;
      </Typography>
      {!!results.length && <SearchList data={results} />}
    </Box>
  )
}
