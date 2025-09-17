import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const useValidation = (schema) => {
    const methods = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
    });

    return { ...methods };
};

export default useValidation;
