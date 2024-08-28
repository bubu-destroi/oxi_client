import { Link } from 'react-router-dom';
import {  useState } from 'react';

function NavbarLeft() {
  const [toggleLeft, setToggleLeft] = useState(false);

  const handleToggleLeft = () => {
    if (window.innerWidth > 780) {
      setToggleLeft(true);
      return;
    }
    setToggleLeft(!toggleLeft);
  };
  

  return (
    <div id="navbar-container" className="fixed top-0 left-0 z-40">
      <div className="flex justify-between items-center p-4">
        {/* Left Container */}
        <div id="left-container" className="relative">
          {/* Logo with Dropdown Toggle */}
          <div onClick={handleToggleLeft} className="cursor-pointer">
            <img src="/oxito.png" alt="oxitoficina-logo" className="w-20 md:w-40" />
          </div>
  
          {/* Left Dropdown Menu */}
          <div id="left-content" className={`absolute md:relative top-12 md:top-0 left-0 mt-2 w-auto md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none md:text-md font-bold ${toggleLeft ? 'block' : 'hidden'} md:block`}>
            <Link to={`/about-oxitoficina`} className="block px-4 py-2 text-md hover:text-red-500  md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              About OXITOFICINA
            </Link>
            <Link to={`/workshops`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent " onClick={() => setToggleLeft(false)}>
              Workshops
            </Link>
            <Link to={`/wishlist`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Wishlist
            </Link>
            <Link to={`/teachers`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Teachers
            </Link>
            <Link to={`/`} className="block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent" onClick={() => setToggleLeft(false)}>
              Homepage
            </Link>
          </div>
       
        </div>
      </div>
    </div>
  );
  
}

export default NavbarLeft;
