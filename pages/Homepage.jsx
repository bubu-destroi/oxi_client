import { Link } from 'react-router-dom';

function Homepage() {
  
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
          {/* {user && (
            <Link to={`/profile/${user._id}`}>
              <h3>Your profile</h3>
            </Link>
          )} */}
        </div>
      </div>
      <div className='about-homepage'>
        <h1>
          Welcome to <br /> OXITOFICINA
        </h1>
        <h3>Sharing knowledge between the talented and the curious.</h3>
        <h5>
          We offer tailored <Link to={`/workshops`}>workshops </Link>
          curated by our verified, industry-leading{' '}
          <Link to={`/teachers`}>tutors and collaborators. </Link>
          <br />
          <br />
          We don’t follow any defined syllabus, but are guided by our students
          desires and our teachers creativity.
          <br />
          <br />
          Let us know what you want to learn by{' '}
          <Link to={'/create-wish'}>submitting a wish </Link>
           on our
          <Link to={`/wishlist`}> wishlist </Link>
          or
          <Link to={`/signup`}> create an account </Link>
          and sign up to attend an upcoming workshop.
        </h5>
      </div>
    </>
  );
}

export default Homepage;
