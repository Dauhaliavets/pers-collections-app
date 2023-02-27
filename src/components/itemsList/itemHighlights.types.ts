import { IHighlight, IHighlightTexts } from '../../models/Item.model'

interface IItemHighlightsProps {
  highlights: IHighlight[]
}

interface IHighlightsProps {
  texts: IHighlightTexts[]
}

export type { IItemHighlightsProps, IHighlightsProps }
