import { API_URL } from '../constants/api'

export function searchItemsByQuery(search: string) {
  return fetch(`${API_URL}search?query=${search}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
      return []
    })
}
