import React from 'react'
import { IHighlightsProps, ISearchItemHighlightsProps } from './searchItemHighlights.types'
import { HighlightTextTypes } from '../../models/Item.model'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Highlights: React.FC<IHighlightsProps> = ({ texts }) => {
  return (
    <>
      {texts.map((text, ind) => {
        if (text.type === HighlightTextTypes.Hit) {
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
            <Typography>Field name: {highlight.path}</Typography>
            <Highlights texts={highlight.texts} />
          </div>
        )
      })}
    </Box>
  )
}
