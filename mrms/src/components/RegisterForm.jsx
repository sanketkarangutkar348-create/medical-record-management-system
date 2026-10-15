import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { errMsg } from '../services/api';
// fields: [{ name, label, type?, options? }]
export default function RegisterForm({ title, fields, submit }) {
  const [v, setV] = useState({});
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const set = (n, val) => setV({ ...v, [n]: val });
  const validate = () => {
    const e = {};
    fields.forEach((f) => { if (!String(v[f.name] || '').trim()) e[f.name] = `${f.label} is required.`; });
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.';
    if (v.phone && !/^[0-9+\-\s]{8,15}$/.test(v.phone)) e.phone = 'Enter a valid phone number.';
    if (v.password && v.password.length < 8) e.password = 'Use at least 8 characters.';
    if (v.password !== v.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    return e;
  };
  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) return;
    setBusy(true);
    try { await submit(v); setMsg({ type: 'success', text: 'Registered. Redirecting to login...' }); setTimeout(() => nav('/login'), 1200); }
    catch (err) { setMsg({ type: 'error', text: errMsg(err) }); }
    finally { setBusy(false); }
  };
  return (
    <section className="auth-card wide"><h1>{title}</h1>
      {msg.text && <p className={`alert ${msg.type}`} role="alert">{msg.text}</p>}
      <form onSubmit={onSubmit} noValidate className="form-grid">
        {fields.map((f) => (
          <div className="field" key={f.name}>
            <label htmlFor={f.name}>{f.label}</label>
            {f.options ? (
              <select id={f.name} value={v[f.name] || ''} onChange={(e) => set(f.name, e.target.value)}><option value="">Select...</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
            ) : (
              <input id={f.name} type={f.type || 'text'} value={v[f.name] || ''} onChange={(e) => set(f.name, e.target.value)} aria-invalid={!!errors[f.name]} />
            )}
            {errors[f.name] && <small className="err">{errors[f.name]}</small>}
          </div>))}
        <button className="btn full" disabled={busy}>{busy ? 'Registering...' : 'Create account'}</button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </section>);
}
