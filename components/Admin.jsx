import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Admin({ children }) {
  const { user } = useContext(AuthContext);
  if (user && user.admin===true) {
    return children;
  }
  return null
}

export default Admin;
