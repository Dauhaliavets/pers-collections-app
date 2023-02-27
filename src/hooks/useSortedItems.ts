import React from 'react'
import { useAppSelector } from '../store'
import { IItem } from '../models/Item.model'

const useSortedItems = () => {
  const [lastCreatedItems, setLastCreatedItems] = React.useState<IItem[]>([])
  const { items } = useAppSelector((state) => state.items)

  const sortItemsByDate = () => {
    const sortedItems = [...items]
    sortedItems.sort((a, b) => {
      if (a && b) {
        return -a.createdAt.localeCompare(b.createdAt)
      }
      return 0
    })
    setLastCreatedItems(sortedItems)
  }

  React.useEffect(() => {
    sortItemsByDate()
  }, [items])

  return { lastCreatedItems }
}

export { useSortedItems }
