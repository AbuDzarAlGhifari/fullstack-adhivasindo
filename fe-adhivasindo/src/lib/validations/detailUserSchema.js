import * as yup from 'yup';

export const detailUserSchema = yup.object({
    user_id: yup
        .number()
        .required('User ID is required')
        .integer('User ID must be an integer')
        .nullable()
        .positive('User ID must be positive'),
    image: yup.string().url('Image must be a valid URL').nullable(),
    bio: yup
        .string()
        .max(1000, 'Bio must not exceed 1000 characters')
        .nullable(),
});
