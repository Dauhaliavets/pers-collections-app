interface ISelectOption {
  value: string
  label: string
}

interface IFormInputTextProps {
  name: string
  label: string
  control?: any
  rules?: any
  type?: string
  selectOptions?: ISelectOption[]
}

interface IFormOutputProps {
  name: string
}

export type { IFormInputTextProps, IFormOutputProps }
