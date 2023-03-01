import React, { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { ClearIconWrapper, Search, SearchIconWrapper, StyledInputBase } from './styled'
import { useIntl } from 'react-intl'

export const HeaderSearch: React.FC = () => {
  const [query, setQuery] = React.useState<string>('')
  const intl = useIntl()
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    navigate(`/search?query=${query}`)
  }

  return (
    <Box
      component={'form'}
      sx={{
        display: 'flex',
        gap: 1,
        order: { sm: 1, xs: 2 },
        flex: { lg: '0 0 auto', md: '0 0 auto', sm: '0 0 auto', xs: '1 1 100%' },
      }}
      onSubmit={onSubmit}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={intl.formatMessage({ id: 'app.header.search.placeholer' })}
          inputProps={{ 'aria-label': intl.formatMessage({ id: 'app.header.search.label' }) }}
        />
        {query && (
          <ClearIconWrapper>
            <IconButton aria-label='clear' onClick={() => setQuery('')}>
              <ClearIcon />
            </IconButton>
          </ClearIconWrapper>
        )}
      </Search>
    </Box>
  )
}
