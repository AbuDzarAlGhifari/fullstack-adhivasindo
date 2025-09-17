import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useValidation from '@/hooks/useValidation';
import { useMutation } from '@tanstack/react-query';
import { registerSchema } from '@/lib/validations/registerSchema';
import { authService } from '@/services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useValidation(registerSchema);

    const registerMutation = useMutation({
        mutationFn: (formData) => authService.register(formData),
        onSuccess: (result) => {
            toast.success(result.message);
            navigate('/login');
        },
        onError: (error) => {
            toast.error(
                'Registration failed: ' +
                    (error.response?.data?.message || error.message)
            );
        },
    });

    const onSubmit = (data) => {
        registerMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
            >
                <Input
                    {...register('name')}
                    name="name"
                    label="User Name"
                    placeholder="Enter your name"
                    error={errors.name?.message}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    required
                />

                <Input
                    {...register('email')}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="ex: user@example.com"
                    error={errors.email?.message}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    required
                />

                <Input
                    {...register('password')}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    aria-invalid={errors.password ? 'true' : 'false'}
                    required
                />

                <Input
                    {...register('password_confirmation')}
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    placeholder="Confirm your password"
                    error={errors.password_confirmation?.message}
                    aria-invalid={
                        errors.password_confirmation ? 'true' : 'false'
                    }
                    required
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isLoading}
                >
                    {registerMutation.isLoading ? 'Registering...' : 'Sign Up'}
                </Button>

                {registerMutation.isError && (
                    <div className="text-red-500 text-sm">
                        {registerMutation.error.response?.data?.message ||
                            registerMutation.error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegisterPage;
