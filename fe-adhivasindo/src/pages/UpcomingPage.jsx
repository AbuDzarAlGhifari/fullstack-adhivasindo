import { useNavigate } from 'react-router-dom';

const UpcomingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <button
                className="text-2xl font-bold mb-4 text-blue-700 hover:text-blue-500"
                onClick={() => navigate(-1)}
            >
                Back
            </button>
            <h1 className="text-2xl font-bold text-center">
                Upcoming Features
            </h1>
        </div>
    );
};

export default UpcomingPage;
