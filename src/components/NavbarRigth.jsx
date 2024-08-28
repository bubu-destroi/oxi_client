import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

function NavbarRight() {
  const { user, logout } = useContext(AuthContext);
  const [toggleRight, setToggleRight] = useState(false);

  const handleToggleRight = () => {
    if (window.innerWidth > 780) {
      setToggleRight(true);
      return;
    }
    setToggleRight(!toggleRight);
  };
  return (
    <div id="navbar-container" className="fixed top-0 right-0 w-auto md:w-auto z-40 ">
      <div className="flex justify-end items-center p-4">
        {/* Right Container */}
        <div id="right-container" className="relative">
          {/* User Icon with Dropdown Toggle */}
          <div onClick={handleToggleRight} className="cursor-pointer">
            <img src="/user-logo.png" alt="user-logo" className="w-10 md:w-20" />
          </div>
  
          {/* Right Dropdown Menu */}
          <div
            id="right-content"
            className={`absolute  right-0 mt-2 w-auto bg-white md:bg-transparent shadow-lg md:shadow-none md:text-md font-bold ${toggleRight ? 'block' : 'hidden'} md:block`}
          >
            {user ? (
              <>
                <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-md hover:text-red-500" onClick={() => setToggleRight(false)}>
                  Your profile
                </Link>
                <Link to={'/create-wish'} className="block px-4 py-2 text-md hover:text-red-500" onClick={() => setToggleRight(false)}>
                  Add Wish
                </Link>
                <button onClick={() => { logout(); setToggleRight(false); }} className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={`/signup`} className="block px-4 py-2 text-md hover:text-red-500" onClick={() => setToggleRight(false)}>
                  SignUp 
                </Link>
                <Link to={`/login`} className="block px-4 py-2 text-md hover:text-red-500" onClick={() => setToggleRight(false)}>
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
