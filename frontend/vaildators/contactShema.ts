import * as Yup from 'yup';

const contactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),

  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),

  email: Yup.string().email('Invalid email format').required('Email is required'),

  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
    .required('Phone number is required'),
  message: Yup.string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message cannot exceed 500 characters')
    .required('Message is required'),
});

export default contactSchema;
