import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { onAuth } from '../lib/firebaseClient';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuth(u => setUser(u));
    return () => unsubscribe && unsubscribe();
  }, []);
  return <Component {...pageProps} user={user} />;
}
export default MyApp;