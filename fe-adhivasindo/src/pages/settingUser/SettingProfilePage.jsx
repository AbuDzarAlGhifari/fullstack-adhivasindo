import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useValidation } from '@/hooks/useValidation';
import { detailUserSchema } from '@/lib/validations/detailUserSchema';
import { detailUsersService } from '@/services/detailUsersService';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services';

export default function SettingProfilePage() {
    const queryClient = useQueryClient();

    const {
        data: profileRes,
        isLoading: isUserLoading,
        isError: isUserError,
    } = useQuery({
        queryKey: ['me'],
        queryFn: authService.getCurrentUser,
    });

    const userId = profileRes?.data?.id;

    const {
        data: detailsRes,
        isLoading: isDetailLoading,
        isError: isDetailError,
    } = useQuery({
        queryKey: ['detail_users', userId],
        queryFn: () => detailUsersService.list(),
        enabled: !!userId,
    });

    const detail = detailsRes?.find((d) => d.user_id === userId) || null;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useValidation(detailUserSchema, { defaultValues: detail });

    useEffect(() => {
        if (detail) reset(detail);
    }, [detail, reset]);

    const saveMutation = useMutation({
        mutationFn: (payload) =>
            detail
                ? detailUsersService.update(detail.id, payload)
                : detailUsersService.create({ ...payload, user_id: userId }),
        onSuccess: () => {
            toast.success('Profile saved');
            queryClient.invalidateQueries({ queryKey: ['detail_users'] });
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || 'Save failed');
        },
    });

    const onSubmit = (values) => saveMutation.mutate(values);

    if (isUserLoading || isDetailLoading) return <div>Loading profile...</div>;
    if (isUserError || isDetailError) return <div>Error loading profile.</div>;

    return (
        <div className="mt-4 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Profil Saya</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input label="User ID" value={userId} readOnly />
                <Input
                    label="Avatar URL"
                    {...register('image')}
                    error={errors.image?.message}
                />
                <Input
                    label="Bio"
                    {...register('bio')}
                    error={errors.bio?.message}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        loading={isSubmitting || saveMutation.isLoading}
                    >
                        Simpan
                    </Button>
                </div>
            </form>
        </div>
    );
}
