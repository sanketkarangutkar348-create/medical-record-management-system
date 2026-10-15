import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, CalendarDays, UserCog, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
const links = {
  doctor: [['/doctor', 'Dashboard', LayoutDashboard], ['/patients', 'Patients', Users], ['/records', 'Medical records', FileText], ['/appointments', 'Appointments', CalendarDays], ['/profile', 'Profile', UserCog]],
  patient: [['/patient', 'Dashboard', LayoutDashboard], ['/records', 'My records', FileText], ['/appointments', 'Appointments', CalendarDays], ['/profile', 'Profile', UserCog]],
  admin: [['/admin', 'Dashboard', LayoutDashboard], ['/profile', 'Profile', UserCog]],
};
export default function Sidebar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  return (
    <aside className="sidebar">
      <div className="brand">MRMS</div>
      <nav>{(links[user.role] || []).map(([to, label, Icon]) => <NavLink key={to} to={to}><Icon size={18} /> {label}</NavLink>)}</nav>
      <button className="logout" onClick={async () => { await logout(); nav('/login'); }}><LogOut size={18} /> Logout</button>
    </aside>
  );
}
