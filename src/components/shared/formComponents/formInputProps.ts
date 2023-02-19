interface ISelectOption {
  value: string
  label: string
}

interface IFormInputTextProps {
  name: string
  control: any
  label: string
  selectOptions?: ISelectOption[]
}

export type { IFormInputTextProps }
