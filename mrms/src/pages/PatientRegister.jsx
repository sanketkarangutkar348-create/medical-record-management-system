import RegisterForm from '../components/RegisterForm.jsx';
import { registerPatient } from '../services/authService';
const fields = [
  { name: 'fullName', label: 'Full name' }, { name: 'dob', label: 'Date of birth', type: 'date' },
  { name: 'gender', label: 'Gender', options: ['Female', 'Male', 'Other'] }, { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone number' }, { name: 'address', label: 'Address' },
  { name: 'bloodGroup', label: 'Blood group', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  { name: 'emergencyContact', label: 'Emergency contact' }, { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm password', type: 'password' },
];
export default function PatientRegister() { return <RegisterForm title="Patient registration" fields={fields} submit={registerPatient} />; }
