import Page from '../components/ui/Page'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button';
import { useAuth } from '../store/auth';

const NotFound = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if(user?.role){
            navigate(`/${user?.role}`);
        } else {
            navigate('/');
        }
    }

    return (
        <Page className='flex flex-col gap-4 justify-center items-center'>
            <span className='text-2xl font-semibold'>Sorry. We can't find this page.</span>
            <Button className='bg-primary text-white' onClick={handleGoBack}>
                Go Back Home
            </Button>
        </Page>
    )
}

export default NotFound
