import { IAdditionalField } from '../../../models/additionalField.model'

interface ICollectionAdditionalFieldsProps {
  action: 'create' | 'edit'
  additionalFields: IAdditionalField[]
  handleChangeAdditionalField: (
    fieldId: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  handleChangeIsVisible: (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => void
  handleDeleteField: (fieldId: string) => void
}

export type { ICollectionAdditionalFieldsProps }
