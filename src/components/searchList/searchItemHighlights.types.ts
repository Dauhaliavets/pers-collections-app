import { IHighlight, IHighlightTexts } from '../../models/Item.model'

interface ISearchItemHighlightsProps {
  highlights: IHighlight[]
}

interface IHighlightsProps {
  texts: IHighlightTexts[]
}

export type { ISearchItemHighlightsProps, IHighlightsProps }
