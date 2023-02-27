import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TagCloud } from 'react-tagcloud'
import { ICloudTag } from '../../models/CloudTag'
import { fetchCloudTags } from '../../api/fetchCloudTags'
import { Spinner } from '../shared/spinner/Spinner'
import Typography from '@mui/material/Typography'
import { replaceWithoutHashAsFirst } from '../../utils/replaceWithoutHashAsFirst'

export const CloudTags = () => {
  const [tags, setTags] = React.useState<ICloudTag[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    setLoading(true)
    fetchCloudTags().then((results) => {
      setLoading(false)
      setTags(results.slice(0, 20))
    })
  }, [])

  const onClick = (tag: ICloudTag) => {
    const tagQuery = replaceWithoutHashAsFirst(tag.value)
    navigate(`/search?query=${tagQuery}`)
  }

  return (
    <>
      <Typography variant='h5' component='h4'>
        Cloud Tags
      </Typography>
      {loading && <Spinner size={30} />}
      {tags && <TagCloud minSize={16} maxSize={36} tags={tags} onClick={onClick} />}
    </>
  )
}
