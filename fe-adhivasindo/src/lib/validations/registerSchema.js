import * as yup from 'yup';

export const registerSchema = yup.object({
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name must not exceed 50 characters'),

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

    password_confirmation: yup
        .string()
        .required('Password confirmation is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});
