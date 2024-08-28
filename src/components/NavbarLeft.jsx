import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function NavbarLeft() {
  const [toggleLeft, setToggleLeft] = useState(false);

  const navigate = useNavigate();
  const handleToggleLeft = () => {
    if (window.innerWidth > 800) {
      setToggleLeft(true);
      return;
    }
    setToggleLeft(!toggleLeft);
  };

  return (
    <div
      id='navbar-container'
      className='fixed top-0 left-0 z-40'>
      <div className='flex justify-between items-center p-4'>
        {/* Left Container */}
        <div
          id='left-container'
          className='relative'>
          {/* Logo with Dropdown Toggle */}
          <img
            onClick={() => {
              navigate(`/`), setToggleLeft(false);
            }}
            src='/oxito.png'
            alt='oxitoficina-logo'
            className='w-20 md:w-40'
          />
          {toggleLeft ? (
            <img
              onClick={handleToggleLeft}
              src='/menuUp.png'
              alt='oxitoficina-logo'
              className='ml-1 w-5 md:hidden'
            />
          ) : (
            <img
              onClick={handleToggleLeft}
              src='/menuburger.png'
              alt='oxitoficina-logo'
              className='ml-1 w-5 md:hidden'
            />
          )}

          {/*  <div >
            {toggleLeft===false && (<h4 onClick={handleToggleLeft} className="cursor-pointer md:hidden">MENU</h4>)}
          </div> */}

          {/* Left Dropdown Menu */}
          <div
            id='left-content'
            className={`absolute top-30 md:relative  md:top-0 left-0 mt-2 w-auto md:w-auto bg-white 500 bg-opacity-70 md:bg-transparent md:shadow-none md:text-md font-bold ${
              toggleLeft ? 'block' : 'hidden'
            } md:block`}>
            <Link
              to={`/about-oxitoficina`}
              className='block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent'
              onClick={() => setToggleLeft(false)}>
              About OXITOFICINA
            </Link>
            <Link
              to={`/workshops`}
              className='block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent '
              onClick={() => setToggleLeft(false)}>
              Workshops
            </Link>
            <Link
              to={`/wishlist`}
              className='block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent'
              onClick={() => setToggleLeft(false)}>
              Wishlist
            </Link>
            <Link
              to={`/teachers`}
              className='block px-4 py-2 text-md hover:text-red-500 md:hover:bg-transparent'
              onClick={() => setToggleLeft(false)}>
              Teachers
            </Link>
            <Link
              to={`/`}
              className='block px-4 py-2 text-md  hover:text-red-500 md:hover:bg-transparent'
              onClick={() => setToggleLeft(false)}>
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarLeft;
