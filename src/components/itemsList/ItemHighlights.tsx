import React from 'react'
import { IHighlightsProps, IItemHighlightsProps } from './itemHighlights.types'
import { HighlightTextTypes } from '../../models/Item.model'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FormattedMessage } from 'react-intl'

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

export const ItemHighlights: React.FC<IItemHighlightsProps> = ({ highlights }) => {
  return (
    <Box>
      {highlights.map((highlight, ind) => {
        return (
          <div key={ind}>
            <Typography>
              <FormattedMessage id='app.itemsList.card.subtitle2' />: {highlight.path}
            </Typography>
            <Highlights texts={highlight.texts} />
          </div>
        )
      })}
    </Box>
  )
}
