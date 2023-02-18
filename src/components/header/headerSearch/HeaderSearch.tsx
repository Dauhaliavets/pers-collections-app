import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Search, SearchIconWrapper, StyledInputBase } from './styled'

export const HeaderSearch: React.FC = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
    </Search>
  )
}
