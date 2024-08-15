import { Link /* , NavLink, Route, Routes */ } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
    
      {/* <Link to={`/profile/${user._id}`}></Link> */}
        <div className='user-logo-menu'>
          <img src='../src/assets/user-logo.png' />
        </div>
    
      <div className='menu-right'>
        {/* 
        <Link to={`/login`}>
          <h3>Log in</h3>
        </Link> */}
        {user && (
          <Link to={`/profile/${user._id}`}>
            <h3>Your profile</h3>
          </Link>
        )}
        {!user && (
          <Link to={`/signup`}>
            <h3>Create an account</h3>
          </Link>
        )}
        {user && (
          <Link to={"/create-wish"}>
            <h3>Add Wish</h3>
          </Link>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={`/login`}>
            <h3>log in</h3>
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
