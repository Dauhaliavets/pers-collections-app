import { IAdditionalField } from '../../models/additionalField.model'

interface ICollectionItemAdditionalFieldsProps {
  additionalFields: IAdditionalField[]
  onChange: (
    fieldId: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export type { ICollectionItemAdditionalFieldsProps }
