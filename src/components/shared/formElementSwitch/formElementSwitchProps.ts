import { IAdditionalField } from '../../../models/additionalField.model'

interface IFormElementSwitchProps {
  field: IAdditionalField
  handleChange: (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  options?: any
}

export type { IFormElementSwitchProps }
