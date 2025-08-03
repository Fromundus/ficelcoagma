import AdminPage from '../../components/ui/AdminPage';
import MemberStatistics from '../../components/MemberStatistics';

const Dashboard = () => {

  return (
    <AdminPage className='flex w-full'>
      <MemberStatistics />
    </AdminPage>
  )
}

export default Dashboard
