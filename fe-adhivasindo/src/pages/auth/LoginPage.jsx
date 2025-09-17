import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import useValidation from '@/hooks/useValidation';
import { loginSchema } from '@/lib/validations/loginSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/authStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useValidation(loginSchema);

    const loginMutation = useMutation({
        mutationFn: (credentials) => login(credentials),
        onSuccess: () => {
            navigate('/dashboard', { replace: true });
        },
        onError: (err) => {
            alert(
                'Login failed: ' + (err.response?.data?.message || err.message)
            );
        },
    });

    const onSubmit = (data) => {
        loginMutation.mutate(data);
    };

    return (
        <div className="max-w-md mx-auto">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
            >
                <Input
                    {...register('email')}
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    required
                />

                <Input
                    {...register('password')}
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    required
                />

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isLoading}
                >
                    {loginMutation.isLoading ? 'Signing in...' : 'Sign in'}
                </Button>

                {loginMutation.isError && (
                    <div className="text-red-500 text-sm">
                        {loginMutation.error?.response?.data?.message ||
                            loginMutation.error?.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
