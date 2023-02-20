import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { IFormInputTextProps } from './formInputProps'

export const FormInputText: React.FC<IFormInputTextProps> = ({ name, label, rules, type }) => {
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
          type={type}
          variant='outlined'
          autoComplete='off'
        />
      )}
    />
  )
}
