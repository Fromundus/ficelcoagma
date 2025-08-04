// src/components/AdminLayout.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import DashboardComponent from '../components/DashboardComponent';
import { userNavItems } from '../data/sidebarNavigations';

export default function UserLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // if (!user || user.role !== 'user') {
  //   navigate('/unauthorized');
  //   return null;
  // }

  return (
    <DashboardComponent navItems={userNavItems} />
  );
}
