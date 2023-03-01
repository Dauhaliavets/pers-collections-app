import React from 'react'

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

export { useDebounce }

// React.useEffect(() => {
//   if (debouncedQuery) {
//     setLoading(true)
//     fetchItemsByQuery(debouncedQuery).then((results) => {
//       setLoading(false)
//       console.log('results: ', results)
//       setOptions(results)
//     })
//   } else {
//     setOptions([])
//     setLoading(false)
//   }
// }, [debouncedQuery])