import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import DoctorRegister from './pages/DoctorRegister.jsx';
import PatientRegister from './pages/PatientRegister.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import Patients from './pages/Patients.jsx';
import MedicalRecords from './pages/MedicalRecords.jsx';
import Appointments from './pages/Appointments.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/doctor" element={<DoctorRegister />} />
        <Route path="/register/patient" element={<PatientRegister />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route path="/doctor" element={<ProtectedRoute roles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
        <Route path="/patient" element={<ProtectedRoute roles={['patient']}><PatientDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute roles={['doctor']}><Patients /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute roles={['doctor', 'patient']}><MedicalRecords /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute roles={['doctor', 'patient']}><Appointments /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute roles={['doctor', 'patient', 'admin']}><Profile /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
