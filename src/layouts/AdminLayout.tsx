// // src/components/AdminLayout.tsx
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../store/auth';
import DashboardComponent from '../components/DashboardComponent';
import { adminNavItems } from '../data/sidebarNavigations';

export default function AdminLayout() {
  // const { user } = useAuth();
  // const navigate = useNavigate();

  // if (!user || user.role !== 'admin') {
  //   navigate('/unauthorized');
  //   return null;
  // }

  return (
    <DashboardComponent navItems={adminNavItems} />
  );
}
