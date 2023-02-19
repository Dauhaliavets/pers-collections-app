import React from 'react'
import { Controller } from 'react-hook-form'
import { IFormInputTextProps } from './formInputProps'
import TextareaAutosize from '@mui/material/TextareaAutosize'

export const FormInputTextarea: React.FC<IFormInputTextProps> = ({ name, control, label }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <TextareaAutosize {...field} minRows={3} placeholder={label} style={{ width: 700 }} />
      )}
    />
  )
}
