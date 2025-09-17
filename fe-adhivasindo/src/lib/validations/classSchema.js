import * as yup from 'yup';

export const classSchema = yup.object({
    modul_id: yup
        .number()
        .required('Modul ID is required')
        .integer('Modul ID must be an integer')
        .positive('Modul ID must be positive'),
    name: yup
        .string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(255, 'Name must not exceed 255 characters'),
    cover_image: yup.string().url('Cover image must be a valid URL').nullable(),
    description: yup
        .string()
        .max(2000, 'Description must not exceed 2000 characters')
        .nullable(),
    resource_url: yup
        .string()
        .url('Resource URL must be a valid URL')
        .nullable(),
});
