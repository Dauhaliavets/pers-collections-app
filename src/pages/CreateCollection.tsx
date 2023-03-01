import React from 'react'
import { useIntl } from 'react-intl'
import { ModifyCollection } from '../components/modifyCollection/ModifyCollection'

export const CreateCollection: React.FC = () => {
  const intl = useIntl()

  return (
    <ModifyCollection
      header={intl.formatMessage({ id: 'app.main.titles.collection.create' })}
      action={'create'}
    />
  )
}
