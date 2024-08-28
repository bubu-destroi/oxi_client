import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [toggleLeft, setToggleLeft] = useState(false);
  const [toggleRight, setToggleRight] = useState(false);

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
    <div id="navbar-container" className="fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center p-4">
        {/* Left Container */}
        <div id="left-container" className="relative">
          {/* Logo with Dropdown Toggle */}
          <div onClick={handleToggleLeft} className="cursor-pointer">
            <img src="/oxito.png" alt="oxitoficina-logo" className="w-20 md:w-40" />
          </div>

          {/* Left Dropdown Menu */}
          <div id="left-content" className={`absolute md:relative top-12 md:top-0 left-0 mt-2 w-48 md:w-auto md:bg-transparent shadow-lg md:shadow-none  ${toggleLeft ? 'block' : 'hidden'} md:block`}>
            <Link to={`/about-oxitoficina`} className="block px-4 py-2 text-md  hover:bg-gray-100 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              About OXITOFICINA
            </Link>
            <Link to={`/workshops`} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Workshops
            </Link>
            <Link to={`/wishlist`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Wishlist
            </Link>
            <Link to={`/teachers`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Teachers
            </Link>
            <Link to={`/`} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Homepage
            </Link>
          </div>
        </div>

        {/* Right Container */}
        <div id="right-container" className="relative">
          {/* User Icon with Dropdown Toggle */}
          <div onClick={handleToggleRight} className="cursor-pointer">
            <img src="/user-logo.png" alt="user-logo" className="w-10 md:w-20" />
          </div>

          {/* Right Dropdown Menu */}
          <div id="right-content" className={`absolute md:relative top-12 md:top-0 right-0 mt-2 w-48 md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none rounded-lg ${toggleRight ? 'block' : 'hidden'} md:block`}>
            {user ? (
              <>
                <Link to={`/profile/${user._id}`} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleRight(false)}>
                  Your profile
                </Link>
                <Link to={'/create-wish'} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleRight(false)}>
                  Add Wish
                </Link>
                <button onClick={() => { logout(); setToggleRight(false); }} className="block w-full px-4 py-2 text-md text-gray-700 hover:bg-gray-100 md:hover:bg-transparent">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to={`/signup`} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleRight(false)}>
                  Create an account
                </Link>
                <Link to={`/login`} className="block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleRight(false)}>
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
