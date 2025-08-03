import AdminPage from '../../components/ui/AdminPage';
import { useAuth } from '../../store/auth';
import AccountRegistration from '../../components/AccountRegistration';

const MemberRegistration = () => {
  const { user } = useAuth();

  return (
    <AdminPage className='flex items-center justify-center min-h-[80vh]'>
        <AccountRegistration role={user?.role} />
    </AdminPage>
  )
}

export default MemberRegistration
