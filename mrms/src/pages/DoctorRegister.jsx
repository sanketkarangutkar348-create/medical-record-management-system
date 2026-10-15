import RegisterForm from '../components/RegisterForm.jsx';
import { registerDoctor } from '../services/authService';
const fields = [
  { name: 'fullName', label: 'Full name' }, { name: 'email', label: 'Email', type: 'email' }, { name: 'phone', label: 'Phone number' },
  { name: 'registrationNumber', label: 'Medical registration number' }, { name: 'specialization', label: 'Specialization' },
  { name: 'qualification', label: 'Qualification' }, { name: 'experience', label: 'Years of experience', type: 'number' },
  { name: 'hospital', label: 'Hospital or clinic name' }, { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm password', type: 'password' },
];
export default function DoctorRegister() { return <RegisterForm title="Doctor registration" fields={fields} submit={registerDoctor} />; }
