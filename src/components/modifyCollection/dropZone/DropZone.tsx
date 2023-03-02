import React from 'react'
import { storage } from '../../../firebase/firebase'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useDropzone } from 'react-dropzone'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { Spinner } from '../../shared/spinner/Spinner'
import { IDropZoneProps } from './dropZone.types'
import { FormattedMessage } from 'react-intl'

export const DropZone: React.FC<IDropZoneProps> = ({ imgUrl, setImgUrl }) => {
  const [isLoadingImg, setIsLoadingImg] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    if (!file) return

    setIsLoadingImg(true)
    setImgUrl('')
    setError(null)

    try {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)
            setIsLoadingImg(false)
          })
        },
      )
    } catch (e) {
      setIsLoadingImg(false)
      setError(e as string)
      return
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Box
      p={1}
      border={1}
      borderColor={'#ccc'}
      borderRadius={2}
      sx={{
        display: 'flex',
        flexDirection: isDragActive ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
        ':hover': { cursor: 'pointer', border: '1px solid green' },
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant='caption' display='block'>
          <FormattedMessage id='app.collection.formFields.dragZone.drop' />
        </Typography>
      ) : (
        <Typography variant='caption' display='block'>
          <FormattedMessage id='app.collection.formFields.dragZone.dragn' />
        </Typography>
      )}
      {isLoadingImg && (
        <Box sx={{ position: 'relative' }}>
          <Spinner />
        </Box>
      )}
      {imgUrl && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '380px',
            height: '210px',
          }}
        >
          <img src={imgUrl} />
        </Box>
      )}
      {error && <Alert severity='error'>{error}</Alert>}
    </Box>
  )
}
