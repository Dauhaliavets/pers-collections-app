import { FieldType } from '../models/fieldTypes'
import { ICollection } from '../store/slices/collectionsSlice/model'

const getWidthFromItemType = (type: string): number => {
  switch (type) {
    case FieldType.Checkbox:
    case FieldType.Number:
      return 80
    case FieldType.Date:
      return 100
    default:
      return 150
  }
}

const getTypeFromItemType = (type: string): string => {
  switch (type) {
    case FieldType.Checkbox:
      return 'boolean'
    case FieldType.Number:
      return 'number'
    default:
      return 'string'
  }
}

export const getExtraFieldsForColumns = (collection: ICollection) => {
  if (!collection.extraFields) {
    return []
  }

  return collection.extraFields.map((item) => {
    const width = getWidthFromItemType(item.type)
    const type = getTypeFromItemType(item.type)
    return {
      field: item.label.toLowerCase(),
      headerName: item.label,
      width,
      type,
    }
  })
}
