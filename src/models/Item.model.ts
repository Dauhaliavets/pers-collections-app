import { IAdditionalField } from './additionalField.model'

enum HighlightTextTypes {
  Text = 'text',
  Hit = 'hit',
}

type THighlightTextType = HighlightTextTypes.Text | HighlightTextTypes.Hit

interface IHighlightTexts {
  value: string
  type: THighlightTextType
}

interface IHighlight {
  path: string
  texts: IHighlightTexts[]
  score: number
}

interface IComment {
  sender: string
  text: string
  createdDate?: string
}

interface IItem {
  _id?: string
  collectionId: string
  title: string
  tags: string[]
  comments: IComment[]
  likes: string[]
  extraFields?: IAdditionalField[]
  timestamps?: { createdAt: string }
  highlights?: IHighlight[]
}

export { HighlightTextTypes }
export type { IItem, IComment, IHighlight, IHighlightTexts }
