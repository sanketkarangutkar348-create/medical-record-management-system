import { Link } from 'react-router-dom';
export default function NotFound() { return <section className="page-narrow"><h1>Page not found</h1><p>The page you opened does not exist.</p><Link className="btn" to="/">Go home</Link></section>; }
