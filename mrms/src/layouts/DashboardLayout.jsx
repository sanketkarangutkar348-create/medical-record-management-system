import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';
export default function DashboardLayout() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  return <div className="dash"><Sidebar /><main className="dash-main"><Outlet /></main></div>;
}
