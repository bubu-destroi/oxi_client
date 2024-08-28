import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

function NavbarRight() {
  const { user, logout } = useContext(AuthContext);
  //const [toggleRight, setToggleRight] = useState(false);
  const navigate = useNavigate()

  /* const handleToggleRight = () => {
    if (window.innerWidth > 780) {
      setToggleRight(true);
      return;
    }
    setToggleRight(!toggleRight);
  }; */
  return (
    <div
      id='navbar-container'
      className='fixed top-0 right-0 w-auto md:w-auto z-40 '>
      <div className='flex justify-end items-center '>
        <div
          id='right-container'
          className='relative p-4'>
          <div>
          {user? (<img
              onClick={() => navigate(`/profile/${user._id}`)}
              src='/user-logo.png'
              alt='user-logo'
              className='w-10 md:w-20'
            />) : (<img
              onClick={() => navigate(`/login`)}
              src='/user-logo.png'
              alt='user-logo'
              className='w-10 md:w-20'
            />)}
            
          </div>
          <div
            id='right-content'
            className="absolute text-sm/[9px] text-right right-0  mt-1 w-auto md:bg-transparent md:shadow-none md:text-md font-bold md:block">
            {user ? (
              <>
              <div className='w-auto mr-4'>

                <Link
                  to={`/profile/${user._id}`}
                  className='block px-1 py-1 text-[10px] hover:text-red-500 md:text-[14px] md:py-4'
                  >
                  You
                </Link>
                <Link
                  to={'/create-wish'}
                  className='block px-1 py-1 text-[10px] hover:text-red-500 md:text-[14px] md:py-4'
                  >
                  Wish
                </Link>
                <button
                  onClick={() => {
                    logout();
                    
                  }}
                  className='block w-full px-1 py-1 text-[10px] hover:text-red-500 md:text-[14px] md:py-4'>
                  Logout
                </button>
              </div>
              </>
            ) : (
              <>
                <Link
                  to={`/signup`}
                  className='block px-4 py-2 text-[10px] hover:text-red-500 md:text-[14px] md:py-4'
                  > SignUp
                </Link>
                <Link
                  to={`/login`}
                  className='block px-4 py-2 text-[10px] hover:text-red-500 md:text-[14px] md:py-4'
                  >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarRight;
