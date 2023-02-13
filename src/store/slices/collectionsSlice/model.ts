import { IAdditionalField } from '../../../models/additionalField.model'

interface ICollection {
  _id?: string
  ownerId: string
  title: string
  description: string
  imageUrl?: string
  extraFields?: IAdditionalField[]
}

interface CollectionsState {
  collections: ICollection[]
  isLoading: boolean
  error: { message: string } | null
}

interface FetchCollectionsByIdRequest {
  id: string
}

interface CreateCollectionRequest {
  token: string
  body: ICollection
}

interface DeleteCollectionRequest {
  id: string
  token: string
}

interface UpdateCollectionRequest {
  id: string
  token: string
  newBody: Partial<ICollection>
}

export type {
  ICollection,
  CollectionsState,
  FetchCollectionsByIdRequest,
  CreateCollectionRequest,
  DeleteCollectionRequest,
  UpdateCollectionRequest,
}
