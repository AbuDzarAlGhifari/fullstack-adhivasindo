import * as yup from 'yup';

export const reportSchema = yup.object({
    user_id: yup
        .number()
        .required('User ID is required')
        .integer('User ID must be an integer')
        .positive('User ID must be positive'),
    modul_id: yup
        .number()
        .required('Modul ID is required')
        .integer('Modul ID must be an integer')
        .positive('Modul ID must be positive'),
    class_id: yup
        .number()
        .required('Class ID is required')
        .integer('Class ID must be an integer')
        .positive('Class ID must be positive'),
    score: yup
        .number()
        .integer('Score must be an integer')
        .min(0, 'Score cannot be negative')
        .max(100, 'Score cannot exceed 100')
        .nullable(),
});
