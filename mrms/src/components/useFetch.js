import { useEffect, useState } from 'react';
import { errMsg } from '../services/api';
export default function useFetch(fn, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fn().then((r) => { setData(r.data); setError(''); }).catch((e) => setError(errMsg(e))).finally(() => setLoading(false));
  }, deps); // eslint-disable-line
  return { data, error, loading };
}
