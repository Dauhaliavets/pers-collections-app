import { IAdditionalField } from '../models/additionalField.model'
import { FieldType } from '../models/fieldTypes'

export const CheckFilledAdditionalFields = (fields: IAdditionalField[]): boolean => {
  return fields.every((field) => {
    if (field.type !== FieldType.Checkbox) {
      return field.value !== ''
    }
    return true
  })
}
