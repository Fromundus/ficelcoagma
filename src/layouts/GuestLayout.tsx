import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
import Footer from '../components/Footer';

const GuestLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && user.role) {
            navigate(`/${user.role}`);
        }

        window.scrollTo(0, 0);
    }, [user, navigate]);

    return (
        <div>
            <div className='min-h-[100vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default GuestLayout
