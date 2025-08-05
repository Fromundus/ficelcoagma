// // src/components/AdminLayout.tsx
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../store/auth';
import DashboardComponent from '../components/DashboardComponent';
import { superAdminNavItems } from '../data/sidebarNavigations';

export default function SuperadminLayout() {
  // const { user } = useAuth();
  // const navigate = useNavigate();

  // if (!user || user.role !== 'admin') {
  //   navigate('/unauthorized');
  //   return null;
  // }

  return (
    <DashboardComponent navItems={superAdminNavItems} />
  );
}
