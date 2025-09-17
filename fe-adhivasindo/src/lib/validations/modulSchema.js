import * as yup from 'yup';

export const modulSchema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(255, 'Title must not exceed 255 characters'),
    description: yup
        .mixed()
        .test('is-json', 'Description must be valid JSON', (value) => {
            if (value == null) return true;
            try {
                JSON.stringify(value);
                return true;
            } catch {
                return false;
            }
        })
        .nullable(),
    cover_image: yup.string().url('Cover image must be a valid URL').nullable(),
    user_id: yup
        .number()
        .integer('Instructor ID must be an integer')
        .positive('Instructor ID must be positive')
        .nullable(),
    // start_date: yup
    //     .date()
    //     .nullable()
    //     .typeError('Start date must be a valid date'),
    // end_date: yup
    //     .date()
    //     .nullable()
    //     .typeError('End date must be a valid date')
    //     .min(yup.ref('start_date'), 'End date cannot be before start date'),
});
