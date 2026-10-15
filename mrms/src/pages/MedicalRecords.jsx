import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../components/useFetch';
import DataTable from '../components/DataTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getRecords, createRecord } from '../services/medicalRecordService';
import { errMsg } from '../services/api';
const blank = { patientId: '', date: '', symptoms: '', diagnosis: '', treatment: '', prescriptions: '', labResults: '', notes: '' };
const split = (s) => s.split(',').map((x) => x.trim()).filter(Boolean);
export default function MedicalRecords() {
  const { user } = useAuth();
  const [sp] = useSearchParams();
  const [tick, setTick] = useState(0);
  const [f, setF] = useState({ ...blank, patientId: sp.get('patientId') || '' });
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState({ type: '', text: '' });
  const r = useFetch(() => getRecords(sp.get('patientId') ? { patientId: sp.get('patientId') } : {}), [tick]);
  const set = (k, v) => setF({ ...f, [k]: v });
  const pick = (e) => {
    const x = e.target.files[0];
    if (x && (!['application/pdf', 'image/png', 'image/jpeg'].includes(x.type) || x.size > 5 * 1024 * 1024)) { setMsg({ type: 'error', text: 'Only PDF, PNG or JPG files up to 5 MB.' }); e.target.value = ''; return; }
    setFile(x || null);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!f.patientId || !f.date || !f.diagnosis) return setMsg({ type: 'error', text: 'Patient, date and diagnosis are required.' });
    try {
      const body = new FormData(); // multipart so a report can be attached. Backend must re-validate the file.
      Object.entries({ ...f, prescriptions: JSON.stringify(split(f.prescriptions)), labResults: JSON.stringify(split(f.labResults)) }).forEach(([k, v]) => body.append(k, v));
      if (file) body.append('report', file);
      await createRecord(body);
      setMsg({ type: 'success', text: 'Record saved.' }); setF({ ...blank, patientId: f.patientId }); setFile(null); setTick(tick + 1);
    } catch (err) { setMsg({ type: 'error', text: errMsg(err) }); }
  };
  const txt = (k, label, area) => (<div className="field"><label htmlFor={k}>{label}</label>{area ? <textarea id={k} rows="2" value={f[k]} onChange={(e) => set(k, e.target.value)} /> : <input id={k} type={k === 'date' ? 'date' : 'text'} value={f[k]} onChange={(e) => set(k, e.target.value)} />}</div>);
  return (<><h1>Medical records</h1>
    <DataTable loading={r.loading} error={r.error} rows={Array.isArray(r.data) ? r.data : []} empty="No records found."
      columns={[{ key: 'date', label: 'Date', render: (x) => x.date?.slice(0, 10) }, { key: 'symptoms', label: 'Symptoms' }, { key: 'diagnosis', label: 'Diagnosis' }, { key: 'treatment', label: 'Treatment' }, { key: 'notes', label: "Doctor's notes" }]} />
    {user.role === 'doctor' && (<form className="card form-grid" onSubmit={submit}><h2 className="span">Add record</h2>
      {msg.text && <p className={`alert ${msg.type} span`} role="alert">{msg.text}</p>}
      {txt('patientId', 'Patient ID')}{txt('date', 'Date of consultation')}{txt('symptoms', 'Symptoms', 1)}{txt('diagnosis', 'Diagnosis', 1)}
      {txt('treatment', 'Treatment plan', 1)}{txt('prescriptions', 'Prescriptions (comma separated)', 1)}{txt('labResults', 'Lab results (comma separated)', 1)}{txt('notes', "Doctor's notes", 1)}
      <div className="field"><label htmlFor="rep">Report file (PDF, PNG, JPG)</label><input id="rep" type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={pick} /></div>
      <button className="btn span">Save record</button></form>)}
    {user.role === 'patient' && <p className="note">Records are read-only. Only your doctor can change them.</p>}</>);
}
