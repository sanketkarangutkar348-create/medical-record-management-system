import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api, { errMsg } from '../services/api';
export default function Profile() {
  const { user, setUser, logout } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({ fullName: user.fullName || '', phone: user.phone || '', address: user.address || '' });
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const save = async (e) => { e.preventDefault(); try { const r = await api.put('/auth/me', f); setUser(r.data.user); setMsg({ type: 'success', text: 'Profile updated.' }); } catch (er) { setMsg({ type: 'error', text: errMsg(er) }); } };
  const change = async (e) => {
    e.preventDefault();
    if (pw.newPassword.length < 8) return setMsg({ type: 'error', text: 'New password needs at least 8 characters.' });
    try { await api.put('/auth/password', pw); setMsg({ type: 'success', text: 'Password changed.' }); setPw({ currentPassword: '', newPassword: '' }); } catch (er) { setMsg({ type: 'error', text: errMsg(er) }); }
  };
  return (<><h1>Profile and settings</h1>
    {msg.text && <p className={`alert ${msg.type}`} role="alert">{msg.text}</p>}
    <form className="card form-grid" onSubmit={save}><h2 className="span">Edit profile</h2>
      <div className="field"><label htmlFor="n">Full name</label><input id="n" value={f.fullName} onChange={(e) => setF({ ...f, fullName: e.target.value })} /></div>
      <div className="field"><label htmlFor="p">Phone</label><input id="p" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
      <div className="field"><label htmlFor="a">Address</label><input id="a" value={f.address} onChange={(e) => setF({ ...f, address: e.target.value })} /></div>
      <p className="note span">Email: {user.email} | Role: {user.role}</p><button className="btn">Save changes</button></form>
    <form className="card form-grid" onSubmit={change}><h2 className="span">Change password</h2>
      <div className="field"><label htmlFor="c">Current password</label><input id="c" type="password" autoComplete="current-password" value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} /></div>
      <div className="field"><label htmlFor="w">New password</label><input id="w" type="password" autoComplete="new-password" value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} /></div>
      <button className="btn">Change password</button></form>
    <button className="btn btn-outline" onClick={async () => { await logout(); nav('/login'); }}>Logout</button></>);
}
