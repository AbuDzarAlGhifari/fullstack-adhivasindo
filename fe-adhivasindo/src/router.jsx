import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AuthLayout from './pages/auth/components/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ChatPage from './pages/chat/ChatPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import KalenderPage from './pages/kalender/KalenderPage';
import KelasPage from './pages/kelas/KelasPage';
import ModulPage from './pages/modul/ModulPage';
import PemateriPage from './pages/pemateri/PemateriPage';
import PesertaPage from './pages/peserta/PesertaPage';
import ReportPage from './pages/report/ReportPage';
import SchedulePage from './pages/schedule/SchedulePage';
import SettingProfilePage from './pages/settingUser/SettingProfilePage';
import UpcomingPage from './pages/UpcomingPage';
// import {
//     ProtectedRoute,
//     PublicRoute,
// } from './components/providers/RouteGuards';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },

    {
        path: '/',
        element: (
            // <PublicRoute>
            <AuthLayout />
            // </PublicRoute>
        ),
        children: [
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },

    // Private Pages
    {
        path: '/',
        element: (
            // <ProtectedRoute>
            <Layout />
            // </ProtectedRoute>
        ),
        children: [
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'modul', element: <ModulPage /> },
            { path: 'kelas', element: <KelasPage /> },
            { path: 'penilaian', element: <ReportPage /> },
            { path: 'jadwal', element: <SchedulePage /> },
            { path: 'peserta', element: <PesertaPage /> },
            { path: 'chat', element: <ChatPage /> },
            { path: 'pemateri', element: <PemateriPage /> },
            { path: 'settings', element: <SettingProfilePage /> },
            { path: 'kalender', element: <KalenderPage /> },
            { path: 'upcoming', element: <UpcomingPage /> },
        ],
    },

    // 404 fallback
    {
        path: '*',
        element: (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        404
                    </h1>
                    <p className="text-gray-600">Page Not Found</p>
                </div>
            </div>
        ),
    },
]);

export default router;
