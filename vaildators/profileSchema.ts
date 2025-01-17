import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
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


export const passwordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(8, 'Current password must be at least 8 characters')
    .required('Current password is required'),

  newPassword: Yup.string()
    .min(8, 'New password must be at least 8 characters')
    .max(100, 'New password cannot exceed 100 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'New password must include one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('New password is required'),

  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm new password is required'),
});



