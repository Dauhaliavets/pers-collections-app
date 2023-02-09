import React from 'react'
import { IAdditionalField } from '../models/additionalField.model'
import uuid from 'react-uuid'

const useAdditionalFields = () => {
  const [additionalFields, setAdditionalFields] = React.useState<IAdditionalField[]>([])

  const createAdditionalField = (fieldType: string, fieldLabel: string) => {
    const newField: IAdditionalField = {
      id: uuid(),
      type: fieldType,
      label: fieldLabel,
      value: '',
      visible: true,
    }

    setAdditionalFields([...additionalFields, newField])
  }

  const handleChangeAdditionalField = (
    fieldId: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const updatedFields = additionalFields.map((field) => {
      const { type, id } = field
      if (fieldId === id) {
        switch (type) {
          case 'checkbox':
            field.value = (event as React.ChangeEvent<HTMLInputElement>).target.checked
            return field
          default:
            field.value = event.target.value
            return field
        }
      } else {
        return field
      }
    })
    setAdditionalFields(updatedFields)
  }

  const handleChangeIsVisible = (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
    const updatedFields = additionalFields.map((field) => {
      const { id } = field
      if (fieldId === id) {
        field.visible = event.target.checked
        return field
      } else {
        return field
      }
    })
    setAdditionalFields(updatedFields)
  }

  const handleDeleteField = (fieldId: string) => {
    const updatedFields = additionalFields.filter((field) => field.id !== fieldId)
    setAdditionalFields(updatedFields)
  }

  return {
    additionalFields,
    setAdditionalFields,
    handleChangeAdditionalField,
    handleChangeIsVisible,
    handleDeleteField,
    createAdditionalField,
  }
}

export { useAdditionalFields }
