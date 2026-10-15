import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { login } from '../services/authService';
import { errMsg } from '../services/api';
import { useAuth } from '../context/AuthContext.jsx';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const { setUser } = useAuth();
  const nav = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault(); setInfo('');
    if (!email || !password) return setError('Enter your email and password.');
    setBusy(true);
    try { const r = await login({ email, password }); setUser(r.data.user); nav(`/${r.data.user.role}`); } // role comes from the server
    catch (err) { setError(errMsg(err)); } finally { setBusy(false); }
  };
  return (
    <section className="auth-card"><h1>Login</h1>
      <p>Doctors, patients and admins log in here.</p>
      {error && <p className="alert error" role="alert">{error}</p>}
      {info && <p className="alert success">{info}</p>}
      <form onSubmit={onSubmit} noValidate>
        <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" /></div>
        <div className="field"><label htmlFor="pw">Password</label>
          <div className="pw"><input id="pw" type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button type="button" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></div>
        <button type="button" className="link-btn" onClick={() => setInfo('Password reset needs a backend endpoint. Not connected yet.')}>Forgot password?</button>
        <button className="btn full" disabled={busy}>{busy ? 'Signing in...' : 'Login'}</button>
      </form>
      <p>New here? <Link to="/register/patient">Patient</Link> or <Link to="/register/doctor">Doctor</Link> registration.</p>
    </section>);
}
