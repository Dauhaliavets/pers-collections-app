/* eslint-disable no-useless-escape */
export const authFormValidationRules = {
  username: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must have at least 3 characters',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 3,
      message: 'Password must have at least 3 characters',
    },
  },
}
