import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useContext } from 'react';

function Homepage() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className='logo-and-search'>
        <div className='logo-div'>
          <Link to={'/'}>
            <img
              src='/oxito.png'
              alt='oxitoficina-logo'
            />
          </Link>
        </div>
        <div className='menu-on-profile'>
          <Link to={`/about-oxitoficina`}>
            <h3>About OXITOFICINA</h3>
          </Link>
          <Link to={`/workshops`}>
            <h3>Our Workshops</h3>
          </Link>
          <Link to={`/wishlist`}>
            <h3>Wishlist</h3>
          </Link>
          <Link to={`/teachers`}>
            <h3>Our Teachers</h3>
          </Link>
          <Link to={`/suggestion-box`}>
            <h3>Suggestion Box</h3>
          </Link>
          {/* {user && (
            <Link to={`/profile/${user._id}`}>
              <h3>Your profile</h3>
            </Link>
          )} */}
        </div>
      </div>
      <div className='about-homepage'>
        <h1>Welcome to OXITOFICINA</h1>
        <h3>
          Here you can find a wider and sharper approach towards learning!
        </h3>
        <h3>
          Check out our <Link to='/teachers'>teachers, collaborators</Link>,
          <Link to='/workshops'> WORKSHOPS</Link> and take a peek at what our
          students want to learn in our <Link to='/wishlist'> WISHLIST</Link> !
        </h3>
        <h5>
          Create an account, let us know what you want to learn about and sign
          up for our already existing workshops!
        </h5>
      </div>
    </>
  );
}

export default Homepage;
