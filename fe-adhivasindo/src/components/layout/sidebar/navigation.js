import {
    BookOpen,
    Calendar,
    LayoutDashboard,
    MessageCircle,
    Settings,
    User,
    Users,
} from 'lucide-react';

export const navigation = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Modul',
        url: '/modul',
        icon: BookOpen,
    },
    {
        title: 'Kelas',
        url: '/kelas',
        icon: BookOpen,
    },
    {
        title: 'Penilaian',
        url: '/penilaian',
        icon: BookOpen,
    },
    {
        title: 'Jadwal',
        url: '/jadwal',
        icon: BookOpen,
    },
    {
        title: 'Peserta',
        url: '/peserta',
        icon: Users,
    },
    // {
    //     title: 'Group Chat',
    //     url: '/chat',
    //     icon: MessageCircle,
    // },
    {
        title: 'Pemateri',
        url: '/pemateri',
        icon: User,
    },
];

export const settings = [
    {
        title: 'Settings',
        url: '/settings',
        icon: Settings,
    },
    {
        title: 'kalender',
        url: '/kalender',
        icon: Calendar,
    },
];
