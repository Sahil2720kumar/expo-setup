import * as yup from 'yup';

export const userSignInSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .trim()
    .lowercase(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required')
    .trim(),
});

export const userSignUpSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'First name must be at least 2 characters long')
    .max(100, 'First name cannot exceed 100 characters'),
  lastName: yup
    .string()
    .min(2, 'Last name must be at least 2 characters long')
    .max(100, 'Last name cannot exceed 100 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required')
    .trim()
    .lowercase(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required')
    .trim(),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required')
    .trim(),
});
