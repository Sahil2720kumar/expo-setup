import * as Yup from 'yup';

const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),

  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),

  phoneNumber: Yup.string()
    .matches(
      /^(\+?\d{1,4})?\s?-?\(?\d{3}\)?\s?-?\d{3}\s?-?\d{4}$/,
      'Phone number must be valid (e.g., +1234567890, (123) 456-7890)'
    )
    .required('Phone number is required'),
});

export default profileSchema;
