import { IAdditionalField } from '../../../models/additionalField.model'

interface IComment {
  itemId: string
  sender: string
  text: string
  timestamps?: { createdAt: string }
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
}

interface ItemsState {
  items: IItem[]
  isLoading: boolean
  error: { message: string } | null
}

interface IRejectValue {
  message: string
}

interface FetchItemsByCollectionIdRequest {
  id: string
}

interface CreateItemRequest {
  token: string
  body: Partial<IItem>
}

interface DeleteItemRequest {
  id: string
  token: string
}

interface UpdateItemRequest {
  id: string
  token: string
  newBody: Partial<IItem>
}

export type {
  IItem,
  ItemsState,
  IRejectValue,
  FetchItemsByCollectionIdRequest,
  CreateItemRequest,
  DeleteItemRequest,
  UpdateItemRequest,
}
