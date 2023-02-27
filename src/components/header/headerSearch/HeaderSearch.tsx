import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { ClearIconWrapper, Search, SearchIconWrapper, StyledInputBase } from './styled'

export const HeaderSearch: React.FC = () => {
  const [query, setQuery] = React.useState<string>('')

  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/search?query=${query}`)
  }

  return (
    <Box component={'form'} sx={{ display: 'flex', gap: 1 }} onSubmit={onSubmit}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
        />
        {query && (
          <ClearIconWrapper>
            <IconButton aria-label='clear' onClick={() => setQuery('')}>
              <ClearIcon />
            </IconButton>
          </ClearIconWrapper>
        )}
      </Search>

      <Button type='submit' variant='contained' size={'small'} sx={{ textTransform: 'none' }}>
        Search
      </Button>
    </Box>
  )
}
