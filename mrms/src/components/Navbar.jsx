import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, HeartPulse } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  return (
    <header className="navbar">
      <Link to="/" className="brand"><HeartPulse /> MRMS</Link>
      <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? 'nav-links open' : 'nav-links'} onClick={() => setOpen(false)}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {user ? <Link className="btn" to={`/${user.role}`}>Dashboard</Link> : (<>
          <Link className="btn btn-outline" to="/login">Login</Link>
          <Link className="btn" to="/register/patient">Register</Link></>)}
      </nav>
    </header>
  );
}
