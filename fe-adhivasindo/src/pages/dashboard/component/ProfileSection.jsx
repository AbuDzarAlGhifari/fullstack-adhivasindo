import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Settings } from 'lucide-react';
import { authService } from '@/services';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
    const navigate = useNavigate();

    const {
        data: userData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['me'],
        queryFn: authService.getCurrentUser,
    });

    if (isLoading) {
        return <div>Loading profile...</div>;
    }
    if (isError || !userData?.data) {
        return <div>Failed to load profile.</div>;
    }

    const user = userData.data;

    return (
        <div className="flex flex-col items-center space-y-3">
            {/* Avatar & Icons */}
            <div className="relative">
                <img
                    src={user.avatarUrl || '/avatar-default.jpg'}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="absolute top-0 right-0 flex gap-1">
                    <button
                        className="p-1 bg-white rounded-full shadow hover:bg-gray-50"
                        onClick={() => navigate('/settings')}
                    >
                        <Settings className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Greeting Text */}
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">
                    SELAMAT DATANG, {user.name.toUpperCase()}
                </h2>
                <p className="text-sm text-gray-500">Di LMS by Adhivasindo</p>
            </div>
        </div>
    );
};

export default ProfileSection;
