import { IItem } from '../store/slices/itemsSlice/model'

const transformValueForField = (value: string | number | boolean) => {
  const typeOf = typeof value
  switch (typeOf) {
    case 'boolean':
      return Boolean(value)
    default:
      return value
  }
}
const getExtraFields = (item: IItem) => {
  if (!item.extraFields) {
    return []
  }
  return item.extraFields.map((extraField) => {
    const key = extraField.label.toLowerCase()
    const value = transformValueForField(extraField.value)
    return {
      [key]: value,
    }
  })
}

export const getExtraFieldsForItem = (item: IItem) => {
  const extraFields = getExtraFields(item)

  return Object.assign({}, ...extraFields)
}
