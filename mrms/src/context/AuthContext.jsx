import { createContext, useContext, useEffect, useState } from 'react';
import { getMe, logout as apiLogout } from '../services/authService';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// The user lives only in memory. The server cookie is the real session,
// and the backend must re-check the role on every request.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMe().then((r) => setUser(r.data.user)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);
  const logout = async () => { try { await apiLogout(); } finally { setUser(null); } };
  return <AuthContext.Provider value={{ user, setUser, loading, logout }}>{children}</AuthContext.Provider>;
}
