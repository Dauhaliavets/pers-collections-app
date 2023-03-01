import React from 'react'
import { IFormElementSwitchProps } from './formElementSwitchProps'
import { FieldType } from '../../../models/fieldTypes'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export const FormElementSwitch: React.FC<IFormElementSwitchProps> = ({
  field,
  handleChange,
  options,
}) => {
  const getElementSelection = () => {
    switch (field.type) {
      case FieldType.Text:
      case FieldType.Number:
      case FieldType.Date:
        return (
          <TextField
            id={field.id}
            type={field.type}
            value={field.value as string}
            onChange={(event) => handleChange(field.id, event)}
            size={'small'}
            {...options}
          />
        )
      case FieldType.Checkbox:
        return (
          <Checkbox
            id={field.id}
            checked={!!field.value as boolean}
            onChange={(event) => handleChange(field.id, event)}
            {...options}
          />
        )
      case FieldType.Textarea:
        return (
          <TextareaAutosize
            id={field.id}
            value={field.value as string}
            onChange={(event) => handleChange(field.id, event)}
            minRows={3}
            placeholder='Here you can write Markdown'
            style={{
              width: 'auto',
              resize: 'vertical',
              backgroundColor: 'inherit',
              color: 'inherit',
            }}
            {...options}
          />
        )

      default:
        return null
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <label htmlFor={field.id} style={{ minWidth: '120px' }}>
        {field.label}
      </label>
      {getElementSelection()}
    </Box>
  )
}
