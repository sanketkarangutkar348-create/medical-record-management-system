import { useState } from 'react';
import useFetch from '../components/useFetch';
import StatCard from '../components/StatCard.jsx';
import DataTable from '../components/DataTable.jsx';
import { getAdminStats } from '../services/patientService';
import { getDoctors } from '../services/doctorService';
import api, { errMsg } from '../services/api';
export default function AdminDashboard() {
  const s = useFetch(getAdminStats);
  const d = useFetch(getDoctors);
  const [msg, setMsg] = useState('');
  const toggle = async (u) => {
    if (!window.confirm(`${u.isActive ? 'Deactivate' : 'Activate'} ${u.fullName}?`)) return;
    try { await api.put(`/admin/users/${u._id}/status`, { isActive: !u.isActive }); setMsg('Status updated. Refresh to see it.'); }
    catch (e) { setMsg(errMsg(e)); }
  };
  return (<><h1>Admin dashboard</h1>
    {s.error && <p className="alert error">{s.error}</p>}
    <div className="stats"><StatCard label="Doctors" value={s.data?.doctors} /><StatCard label="Patients" value={s.data?.patients} /><StatCard label="Appointments" value={s.data?.appointments} /></div>
    {msg && <p className="alert success">{msg}</p>}
    <h2>Doctors</h2>
    <DataTable loading={d.loading} error={d.error} rows={Array.isArray(d.data) ? d.data : []} empty="No doctors registered."
      columns={[{ key: 'fullName', label: 'Name' }, { key: 'registrationNumber', label: 'Reg. no.' }, { key: 'specialization', label: 'Specialization' },
        { key: 'isActive', label: 'Status', render: (u) => (u.isActive ? 'Active' : 'Inactive') },
        { key: 'act', label: 'Action', render: (u) => <button className="btn btn-sm" onClick={() => toggle(u)}>{u.isActive ? 'Deactivate' : 'Activate'}</button> }]} />
    <p className="note">Admins see account data only, not medical records. The backend must enforce this. The status endpoint is a proposed contract.</p></>);
}
