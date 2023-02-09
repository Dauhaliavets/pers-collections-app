import { Box, Checkbox, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { IAdditionalField } from '../../models/additionalField.model'

type TElementSwitcherProps = {
  field: IAdditionalField
  handleChange: (
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export const ElementSwitcher: React.FC<TElementSwitcherProps> = ({ field, handleChange }) => {
  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor={field.id} style={{ minWidth: '120px' }}>
            {field.label}
          </label>
          <TextField
            id={field.id}
            type={field.type}
            value={field.value as string}
            onChange={(event) => handleChange(field.id, event)}
            size={'small'}
          />
        </Box>
      )
    case 'checkbox':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor={field.id} style={{ minWidth: '120px' }}>
            {field.label}
          </label>
          <Checkbox
            id={field.id}
            checked={field.value as boolean}
            onChange={(event) => handleChange(field.id, event)}
          />
        </Box>
      )
    case 'textarea':
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <label htmlFor={field.id} style={{ minWidth: '120px' }}>
            {field.label}
          </label>
          <TextareaAutosize
            id={field.id}
            value={field.value as string}
            onChange={(event) => handleChange(field.id, event)}
            minRows={3}
            placeholder='Here you can write Markdown'
            style={{ width: 700 }}
          />
        </Box>
      )

    default:
      return null
  }
}
