import React from 'react'
import { useAppSelector } from '../store'
import { ICollection } from '../store/slices/collectionsSlice/model'

type TCollectionWithQuantity = ICollection & { quantity: number }

const useSortedCollections = () => {
  const [mostLargestCollections, setMostLargestCollections] = React.useState<
    TCollectionWithQuantity[]
  >([])

  const { collections } = useAppSelector((state) => state.collections)
  const { items } = useAppSelector((state) => state.items)

  const sortCollectionsByQuantityItems = () => {
    const collectionsWithQuantity = collections.reduce((acc, collection) => {
      if (collection._id) {
        const filteredItemsByCollectionId = items.filter(
          (item) => item.collectionId === collection._id,
        )
        acc.push({ ...collection, quantity: filteredItemsByCollectionId.length })
      }
      return acc
    }, [] as TCollectionWithQuantity[])

    collectionsWithQuantity.sort((a, b) => b.quantity - a.quantity)

    setMostLargestCollections(collectionsWithQuantity)
  }

  React.useEffect(() => {
    sortCollectionsByQuantityItems()
  }, [collections, items])

  return { mostLargestCollections }
}

export { useSortedCollections }
