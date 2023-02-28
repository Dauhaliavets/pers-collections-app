import { IAdditionalField } from './additionalField.model'

interface ICollection {
  _id?: string
  ownerId: string
  title: string
  description: string
  topic: string
  imageUrl?: string
  extraFields?: IAdditionalField[]
}

export type { ICollection }
