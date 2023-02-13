import { IAdditionalField } from '../../../models/additionalField.model'

interface IItem {
  _id?: string
  collectionId: string
  title: string
  tags: string[]
  comments: string[]
  likes: string[]
  extraFields?: IAdditionalField[]
}

interface ItemsState {
  items: IItem[]
  isLoading: boolean
  error: { message: string } | null
}

interface FetchItemsByCollectionIdRequest {
  id: string
}

interface CreateItemRequest {
  token: string
  body: IItem
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
  FetchItemsByCollectionIdRequest,
  CreateItemRequest,
  DeleteItemRequest,
  UpdateItemRequest,
}
