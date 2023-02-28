import { API_URL } from '../constants/api'

export async function fetchTagsByQuery(query: string): Promise<string[]> {
  return fetch(`${API_URL}search/tags?query=${query}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
      return []
    })
}
