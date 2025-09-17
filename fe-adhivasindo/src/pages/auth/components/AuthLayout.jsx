import { dummy_auth } from '@/assets/dummy';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
    const location = useLocation();

    return (
        <div
            className="min-h-screen flex items-center justify-center md:justify-end bg-cover bg-center"
            style={{ backgroundImage: `url(${dummy_auth})` }}
        >
            <main className="bg-white/70 p-6 rounded-xl w-full sm:max-w-md md:max-w-lg lg:w-1/3 m-2 md:m-6">
                <h1 className="text-2xl font-bold pb-2 flex justify-end capitalize">
                    {location.pathname.replace('/', ' ')}
                </h1>
                <Outlet />
                <p className="text-center mt-6 text-sm">
                    {location.pathname === '/login' ? (
                        <>
                            Belum punya akun?{' '}
                            <Link
                                to="/register"
                                className="text-primary-foreground font-semibold hover:underline"
                            >
                                Daftar disini
                            </Link>
                        </>
                    ) : (
                        <>
                            Sudah punya akun?{' '}
                            <Link
                                to="/login"
                                className="text-primary-foreground font-semibold hover:underline"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </p>
            </main>
        </div>
    );
};

export default AuthLayout;
