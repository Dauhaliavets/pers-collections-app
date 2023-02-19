import React from 'react'
import { Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import { IFormInputTextProps } from './formInputProps'

export const FormInputText: React.FC<IFormInputTextProps> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          error={!!error}
          label={label}
          variant='outlined'
          autoComplete='off'
          size='small'
        />
      )}
    />
  )
}
