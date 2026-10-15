import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../components/useFetch';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { getPatients } from '../services/patientService';
import { getAppointments } from '../services/appointmentService';
export default function DoctorDashboard() {
  const [q, setQ] = useState('');
  const p = useFetch(() => getPatients({ search: q }), [q]);
  const a = useFetch(getAppointments);
  const today = new Date().toISOString().slice(0, 10);
  const appts = Array.isArray(a.data) ? a.data : [];
  return (<><h1>Doctor dashboard</h1>
    <div className="stats"><StatCard label="Total patients" value={Array.isArray(p.data) ? p.data.length : null} />
      <StatCard label="Today's appointments" value={a.data ? appts.filter((x) => x.date?.slice(0, 10) === today).length : null} />
      <StatCard label="Upcoming" value={a.data ? appts.filter((x) => x.date?.slice(0, 10) > today).length : null} /></div>
    <div className="row"><Link className="btn" to="/records">Add record</Link><Link className="btn btn-outline" to="/appointments">Appointments</Link></div>
    <h2>Recent patients</h2>
    <input className="search" placeholder="Search by name or patient ID" aria-label="Search patients" value={q} onChange={(e) => setQ(e.target.value)} />
    <DataTable loading={p.loading} error={p.error} rows={Array.isArray(p.data) ? p.data.slice(0, 5) : []} empty="No patients assigned yet."
      columns={[{ key: 'patientId', label: 'ID' }, { key: 'fullName', label: 'Name' }, { key: 'phone', label: 'Phone' }]} /></>);
}
