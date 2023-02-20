import { IAdditionalField } from '../../models/additionalField.model'

type CollectionForm = {
  title: string
  description: string
  topic: string
}

interface IModifyCollection {
  action: 'create' | 'edit'
  header: string
  title?: string
  description?: string
  topic?: string
  imageUrl?: string
  extraFields?: IAdditionalField[]
}

export type { CollectionForm, IModifyCollection }
