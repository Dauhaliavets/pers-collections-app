import React from 'react'
import { HighlightResponse } from '../../models/searchResponse.model'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface ISearchItemHighlightsProps {
  highlights: HighlightResponse[]
}

interface IHighlightsProps {
  texts: {
    value: string
    type: 'text' | 'hit'
  }[]
}

const Highlights = ({ texts }: IHighlightsProps) => {
  return (
    <>
      {texts.map((text, ind) => {
        if (text.type === 'hit') {
          return <mark key={ind}>{text.value}</mark>
        }
        return <span key={ind}>{text.value}</span>
      })}
    </>
  )
}

export const SearchItemHighlights: React.FC<ISearchItemHighlightsProps> = ({ highlights }) => {
  return (
    <Box>
      {highlights.map((highlight, ind) => {
        return (
          <div key={ind}>
            <Typography>Filed: {highlight.path}</Typography>
            <Highlights texts={highlight.texts} />
          </div>
        )
      })}
    </Box>
  )
}
