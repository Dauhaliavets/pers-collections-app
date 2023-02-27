import { IComment, IItem } from '../../../models/Item.model'
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

interface FetchItemsByQueryRequest {
  query: string
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

interface CreateItemCommentRequest {
  id: string
  token: string
  commentBody: IComment
}

export type {
  ItemsState,
  IRejectValue,
  FetchItemsByCollectionIdRequest,
  FetchItemsByQueryRequest,
  CreateItemRequest,
  DeleteItemRequest,
  UpdateItemRequest,
  CreateItemCommentRequest,
}
