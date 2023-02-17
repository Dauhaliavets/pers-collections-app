import { ICollection } from '../store/slices/collectionsSlice/model'

export const getVisibleExtraFieldIds = (collection: ICollection): string[] => {
  if (collection.extraFields) {
    const visibleExtraFields = collection.extraFields.filter((extraField) => extraField.visible)
    const ids = visibleExtraFields.map((extraField) => extraField.id)
    return ids
  }
  return []
}
