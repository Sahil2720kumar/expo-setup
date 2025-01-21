import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address cannot exceed 100 characters')
    .required('Address is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City cannot exceed 50 characters')
    .required('City is required'),

  state: Yup.string().min(2, 'State must be at least 2 characters').required('State is required'),

  zipCode: Yup.string()
    .matches(
      /^\d{5}(-\d{4})?$|^\d{6}$/,
      'Zip code must be valid (e.g., 12345, 12345-6789, or 786001)'
    )
    .required('Zip code is required'),

  phoneNumber: Yup.string()
    .matches(
      /^(\+?\d{1,4})?\s?-?\(?\d{3}\)?\s?-?\d{3}\s?-?\d{4}$/,
      'Phone number must be valid (e.g., +1234567890 or (123) 456-7890)'
    )
    .required('Phone number is required'),
});

export default addressSchema;
