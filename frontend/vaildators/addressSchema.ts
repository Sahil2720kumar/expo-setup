import * as Yup from 'yup';

const addressSchema = Yup.object().shape({
  street: Yup.string()
    .min(5, 'Street must be at least 5 characters')
    .max(100, 'Street cannot exceed 100 characters')
    .required('Street is required'),

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

});

export default addressSchema;
