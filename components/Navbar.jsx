import { NavLink, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import Homepage from '../pages/Homepage';

function Navbar() {
  const { user, loading, logout } = useContext(AuthContext);

  return (
    <>
     
    </>
  );
}

export default Navbar;
