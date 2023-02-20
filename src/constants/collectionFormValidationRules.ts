export const collectionFormValidationRules = {
  title: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title must have at least 3 characters',
    },
  },
  description: { required: 'Description is required' },
  topic: { required: 'Topic is required' },
}
