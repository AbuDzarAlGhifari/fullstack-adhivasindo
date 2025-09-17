import * as yup from 'yup';

export const scheduleSchema = yup.object({
    modul_id: yup
        .number()
        .required('Modul ID is required')
        .integer('Modul ID must be an integer')
        .positive('Modul ID must be positive'),
    user_id: yup
        .number()
        .integer('Instructor ID must be an integer')
        .positive('Instructor ID must be positive')
        .nullable(),
    title: yup
        .string()
        .max(255, 'Title must not exceed 255 characters')
        .nullable(),
    start_time: yup
        .date()
        .required('Start time is required')
        .typeError('Start time must be a valid datetime'),
    end_time: yup
        .date()
        .required('End time is required')
        .typeError('End time must be a valid datetime')
        .min(yup.ref('start_time'), 'End time cannot be before start time'),
    location: yup
        .string()
        .max(255, 'Location must not exceed 255 characters')
        .nullable(),
});
