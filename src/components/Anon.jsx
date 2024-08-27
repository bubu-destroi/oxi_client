import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
//import { Navigate } from 'react-router-dom';

function Anon({ children }) {
  const { loading, user } = useContext(AuthContext);
  if (loading) return <p>looooooaaading.....</p>;
  if (user) {
    return children;
  } else {
    return children;
  }
}

export default Anon;
