// src/components/AdminLayout.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import DashboardComponent from '../components/DashboardComponent';
import { onsNavItems } from '../data/sidebarNavigations';

export default function OnsiteLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'ons') {
    navigate('/unauthorized');
    return null;
  }

  return (
    <DashboardComponent navItems={onsNavItems} />
  );
}
