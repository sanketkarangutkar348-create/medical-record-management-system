import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../components/useFetch';
import DataTable from '../components/DataTable.jsx';
import { getPatients, getPatient } from '../services/patientService';
const PAGE = 10;
export default function Patients() {
  const [q, setQ] = useState('');
  const [gender, setGender] = useState('');
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState(null);
  const [selErr, setSelErr] = useState('');
  const p = useFetch(() => getPatients({ search: q, gender }), [q, gender]);
  const all = Array.isArray(p.data) ? p.data : [];
  const rows = all.slice(page * PAGE, page * PAGE + PAGE);
  const view = async (id) => { try { setSelErr(''); setSel((await getPatient(id)).data); } catch { setSelErr('Could not load this patient. You may not be authorized.'); } };
  return (<><h1>Patients</h1>
    <div className="row"><input className="search" placeholder="Search name or patient ID" aria-label="Search" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} />
      <select aria-label="Filter by gender" value={gender} onChange={(e) => { setGender(e.target.value); setPage(0); }}><option value="">All genders</option><option>Female</option><option>Male</option><option>Other</option></select></div>
    <DataTable loading={p.loading} error={p.error} rows={rows} empty="No patients match."
      columns={[{ key: 'patientId', label: 'ID' }, { key: 'fullName', label: 'Name' }, { key: 'gender', label: 'Gender' }, { key: 'bloodGroup', label: 'Blood' },
        { key: 'act', label: '', render: (x) => <button className="btn btn-sm" onClick={() => view(x._id)}>Details</button> }]} />
    <div className="row"><button className="btn btn-outline btn-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
      <span>Page {page + 1}</span><button className="btn btn-outline btn-sm" disabled={(page + 1) * PAGE >= all.length} onClick={() => setPage(page + 1)}>Next</button></div>
    {selErr && <p className="alert error">{selErr}</p>}
    {sel && <div className="card"><h2>{sel.fullName}</h2><p>{sel.email} | {sel.phone} | DOB: {sel.dob?.slice(0, 10)} | Blood: {sel.bloodGroup}</p>
      <Link className="btn btn-sm" to={`/records?patientId=${sel._id}`}>View / add records</Link></div>}</>);
}
