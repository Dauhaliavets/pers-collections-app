import { IAdditionalField } from '../../models/additionalField.model'

type MainFields = {
  title: string
  tags: string
}

interface IModifyCollectionItemProps {
  header: string
  action: 'create' | 'edit'
  title?: string
  tags?: string[]
  extraFields?: IAdditionalField[]
}

export type { MainFields, IModifyCollectionItemProps }
