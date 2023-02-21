import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { IFormInputTextProps } from './formInputProps'
import TextField from '@mui/material/TextField'

export const FormInputTextarea: React.FC<IFormInputTextProps> = ({ name, label, rules }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          helperText={error ? error.message : ''}
          label={label}
          multiline
          minRows={3}
          maxRows={6}
          variant='outlined'
          autoComplete='off'
          fullWidth
        />
      )}
    />
  )
}
