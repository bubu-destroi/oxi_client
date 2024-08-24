import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handLogoClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate(`/profile/${user._id}`);
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <div
        className='user-logo-menu'
        onClick={handLogoClick}>
        <img src='/user-logo.png' />
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
          <Link to={'/create-wish'}>
            <h3>Add Wish</h3>
          </Link>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link to={`/login`}>
            <h3>Log in</h3>
          </Link>
        )}
      </div>
    </>
  );
}

export default Navbar;
