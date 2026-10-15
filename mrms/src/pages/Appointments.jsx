import { useState } from 'react';
import useFetch from '../components/useFetch';
import DataTable from '../components/DataTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getAppointments, bookAppointment, updateAppointment } from '../services/appointmentService';
import { getDoctors } from '../services/doctorService';
import { errMsg } from '../services/api';
export default function Appointments() {
  const { user } = useAuth();
  const [tick, setTick] = useState(0);
  const [f, setF] = useState({ doctorId: '', date: '', time: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });
  const a = useFetch(getAppointments, [tick]);
  const d = useFetch(getDoctors);
  const act = async (id, body, ask) => {
    if (ask && !window.confirm(ask)) return;
    try { await updateAppointment(id, body); setTick(tick + 1); } catch (e) { setMsg({ type: 'error', text: errMsg(e) }); }
  };
  const book = async (e) => {
    e.preventDefault();
    if (!f.doctorId || !f.date || !f.time) return setMsg({ type: 'error', text: 'Choose a doctor, date and time.' });
    try { await bookAppointment(f); setMsg({ type: 'success', text: 'Appointment requested.' }); setTick(tick + 1); } catch (er) { setMsg({ type: 'error', text: errMsg(er) }); }
  };
  const reschedule = (x) => { const date = window.prompt('New date (YYYY-MM-DD)', x.date?.slice(0, 10)); if (date) act(x._id, { date, status: 'pending' }); };
  const cols = [{ key: 'date', label: 'Date', render: (x) => x.date?.slice(0, 10) }, { key: 'time', label: 'Time' }, { key: 'status', label: 'Status' },
    { key: 'act', label: 'Actions', render: (x) => user.role === 'doctor'
      ? (x.status === 'pending' ? <><button className="btn btn-sm" onClick={() => act(x._id, { status: 'accepted' })}>Accept</button> <button className="btn btn-outline btn-sm" onClick={() => act(x._id, { status: 'rejected' })}>Reject</button></> : null)
      : (x.status !== 'cancelled' ? <><button className="btn btn-outline btn-sm" onClick={() => reschedule(x)}>Reschedule</button> <button className="btn btn-outline btn-sm" onClick={() => act(x._id, { status: 'cancelled' }, 'Cancel this appointment?')}>Cancel</button></> : null) }];
  return (<><h1>Appointments</h1>
    {msg.text && <p className={`alert ${msg.type}`} role="alert">{msg.text}</p>}
    {user.role === 'patient' && (<form className="card form-grid" onSubmit={book}><h2 className="span">Book appointment</h2>
      <div className="field"><label htmlFor="doc">Doctor</label><select id="doc" value={f.doctorId} onChange={(e) => setF({ ...f, doctorId: e.target.value })}><option value="">Select...</option>{(Array.isArray(d.data) ? d.data : []).map((x) => <option key={x._id} value={x._id}>{x.fullName} ({x.specialization})</option>)}</select></div>
      <div className="field"><label htmlFor="dt">Date</label><input id="dt" type="date" min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></div>
      <div className="field"><label htmlFor="tm">Time</label><input id="tm" type="time" value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} /></div>
      <button className="btn">Request appointment</button></form>)}
    <DataTable loading={a.loading} error={a.error} rows={Array.isArray(a.data) ? a.data : []} empty="No appointments yet." columns={cols} /></>);
}
