import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, CalendarDays } from 'lucide-react';
export default function Home() {
  return (<>
    <section className="hero">
      <h1>Every patient record, in one secure place.</h1>
      <p>Doctors write records, patients read them, and admins manage accounts. Each role sees only what it needs.</p>
      <div className="row"><Link className="btn" to="/register/patient">Register as patient</Link><Link className="btn btn-outline" to="/register/doctor">Register as doctor</Link><Link className="btn btn-outline" to="/login">Login</Link></div>
    </section>
    <section className="features">
      <div className="card"><ShieldCheck /><h3>Role-based access</h3><p>Patients see only their own records. Doctors see their assigned patients.</p></div>
      <div className="card"><FileText /><h3>Digital records</h3><p>Diagnoses, prescriptions and lab reports stay together and searchable.</p></div>
      <div className="card"><CalendarDays /><h3>Easy appointments</h3><p>Book, reschedule or cancel, and doctors accept or reject requests.</p></div>
    </section></>);
}
