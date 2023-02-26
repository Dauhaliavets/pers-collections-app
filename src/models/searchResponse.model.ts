import { IItem } from '../store/slices/itemsSlice/model'

type ItemResponse = Omit<IItem, 'likes'>
type HighlightResponse = {
  path: string
  texts: {
    value: string
    type: 'text' | 'hit'
  }[]
  score: number
}
type SearchResponse = ItemResponse & { highlights: HighlightResponse[] }

export type { SearchResponse, HighlightResponse }
