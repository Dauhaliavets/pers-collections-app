import { API_URL } from '../constants/api'
import { ICloudTag } from '../models/CloudTag'

export function fetchCloudTags(): Promise<ICloudTag[]> {
  return fetch(`${API_URL}search/tags`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
      return []
    })
}
