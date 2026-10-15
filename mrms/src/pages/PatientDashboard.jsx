import useFetch from '../components/useFetch';
import { useAuth } from '../context/AuthContext.jsx';
import DataTable from '../components/DataTable.jsx';
import { getRecords } from '../services/medicalRecordService';
import { getAppointments } from '../services/appointmentService';
export default function PatientDashboard() {
  const { user } = useAuth();
  const r = useFetch(getRecords);
  const a = useFetch(getAppointments);
  const recs = Array.isArray(r.data) ? r.data : [];
  const today = new Date().toISOString().slice(0, 10);
  const appts = Array.isArray(a.data) ? a.data : [];
  const list = (key) => recs.flatMap((x) => x[key] || []);
  const box = (title, items, none) => (<div className="card"><h3>{title}</h3>{items?.length ? <ul>{items.map((x, i) => <li key={i}>{x}</li>)}</ul> : <p className="empty">{none}</p>}</div>);
  return (<><h1>Welcome, {user.fullName}</h1>
    <div className="card"><h2>Profile</h2><p>{user.email} | Blood group: {user.bloodGroup || '-'} | Phone: {user.phone || '-'}</p></div>
    <h2>Medical history</h2>
    <DataTable loading={r.loading} error={r.error} rows={recs} empty="No records yet."
      columns={[{ key: 'date', label: 'Date', render: (x) => x.date?.slice(0, 10) }, { key: 'diagnosis', label: 'Diagnosis' }, { key: 'treatment', label: 'Treatment' }]} />
    <div className="two-col">{box('Prescriptions', list('prescriptions'), 'None.')}{box('Allergies', user.allergies, 'None recorded.')}{box('Current medications', user.medications, 'None recorded.')}{box('Lab reports', list('labResults'), 'None.')}</div>
    <h2>Appointments</h2>
    <DataTable loading={a.loading} error={a.error} empty="No appointments."
      rows={appts.map((x) => ({ ...x, when: x.date?.slice(0, 10) >= today ? 'Upcoming' : 'Previous' }))}
      columns={[{ key: 'date', label: 'Date', render: (x) => x.date?.slice(0, 10) }, { key: 'time', label: 'Time' }, { key: 'status', label: 'Status' }, { key: 'when', label: 'When' }]} /></>);
}
