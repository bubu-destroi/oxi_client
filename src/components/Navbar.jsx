import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toggleLeft, setToggleLeft] = useState(false);
  const [toggleRight, setToggleRight] = useState(false);

  /*   const handLogoClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate(`/profile/${user._id}`);
    } else {
      navigate('/signup');
    }
  }; */

  const handleToggleLeft = () => {
    if (window.innerWidth > 768) {
      setToggleLeft(true);
      return;
    }
    setToggleLeft(!toggleLeft);
  };
  const handleToggleRight = () => {
    if (window.innerWidth > 768) {
      setToggleRight(true);
      return;
    }
    setToggleRight(!toggleRight);
  };

  return (
    <div
      id='navbar-container'
      className='flex justify-between '>
      <div
        id='left-container'
        className='relative top-0'>
        <div
          className=''
          onClick={handleToggleLeft}>
          <img
            src='/oxito.png'
            alt='oxitoficina-logo'
            className='w-20 md:w-40 fixed'
          />
        </div>
        <div
          id='left-content'
          className={` ${
            toggleLeft ? 'fixed top-1 left-20 p-3' : 'hidden'
          } md:fixed top-10 md:top-60 z-10`}>
          <Link to={`/about-oxitoficina`} >
            <h3 className=''>About OXITOFICINA</h3>
          </Link>
          <Link to={`/workshops`}>
            <h3>Workshops</h3>
          </Link>
          <Link to={`/wishlist`}>
            <h3>Wishlist</h3>
          </Link>
          <Link to={`/teachers`}>
            <h3>Teachers</h3>
          </Link>
          <Link to={`/`}>
            <h3>Homepage</h3>
          </Link>
          {/* {user && (
            <Link to={`/profile/${user._id}`}>
              <h3>Your profile</h3>
            </Link>
          )} */}
        </div>
      </div>
      <div
        id='right-container'
        className='flex flex-col items-end p-2'
        onClick={handleToggleRight}>
        <img
          src='/user-logo.png'
          className='w-10 md:w-28 fixed'
        />

        <div
          id='right-content'
          className={` ${
            toggleRight ? 'fixed top-1 right-20 p-3' : 'hidden'
          } sm:absolute top-28 md:top-60 z-10`}>
          {/* 
        <Link to={`/login`}>
          {user && (
          <h3>Log in</h3>
        </Link> */}
          {user && (
            <Link to={`/profile/${user._id}`} >
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
      </div>
    </div>
  );
}

export default Navbar;
