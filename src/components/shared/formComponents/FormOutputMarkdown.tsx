import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { IFormOutputProps } from './formInputProps'

export const FormOutputMarkdown: React.FC<IFormOutputProps> = ({ name }) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <ReactMarkdown>{field.value}</ReactMarkdown>}
    />
  )
}
