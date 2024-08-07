import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email('Invalid email format')
    //   .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long.')
      .required('Password is required.'),
      username:Yup.string()
      .required('User Name  is required.'),

  });

