import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Email must be a valid email address')
        .min(3, 'Email must be at least 3 characters')
        .max(50, 'Email must not exceed 50 characters'),

    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});
