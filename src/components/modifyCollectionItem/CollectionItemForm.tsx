import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { v4 as uuidv4 } from 'uuid'
import { fetchTagsByQuery } from '../../api/fetchTagsByQuery'

export const CollectionItemForm: React.FC = () => {
  const [options, setOptions] = React.useState<string[]>([])
  const intl = useIntl()

  const methods = useFormContext()
  const { register, setValue } = methods

  const handleInputChange = async (value: string) => {
    if (value.length > 2) {
      const tags = await fetchTagsByQuery(value)
      const filterTags = [...new Set(tags)]
      setOptions(filterTags)
    } else {
      setOptions([])
    }
  }

  return (
    <>
      <TextField
        {...register('title')}
        label={intl.formatMessage({ id: 'app.collectionItem.formFields.title' })}
        type={'text'}
        variant='outlined'
        autoComplete='off'
      />
      <Autocomplete
        {...register('tags')}
        sx={{ width: '100%', '& .MuiSvgIcon-root': { color: '#ffffff' } }}
        onInputChange={(_, newValue) => handleInputChange(newValue)}
        multiple
        freeSolo
        clearOnBlur={false}
        options={options}
        getOptionLabel={(option) => option}
        renderOption={(props, option) => {
          return (
            <li key={uuidv4()} {...props}>
              {option}
            </li>
          )
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({ id: 'app.collectionItem.formFields.tags' })}
          />
        )}
        onChange={(_, newValue) => setValue('tags', newValue)}
      />
    </>
  )
}
