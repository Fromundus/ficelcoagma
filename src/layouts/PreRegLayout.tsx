// src/components/AdminLayout.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import DashboardComponent from '../components/DashboardComponent';
import { preNavItems } from '../data/sidebarNavigations';

export default function PreRegLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'pre') {
    navigate('/unauthorized');
    return null;
  }

  return (
    <DashboardComponent navItems={preNavItems} />
  );
}
