import { Link } from 'react-router-dom';

function Homepage() {
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-10 p-4'>
      <div className='w-full max-w-xl'>
        <h1 className='text-2xl sm:text-lg md:text-4xl font-bold  text-center'>
          Welcome to <br /> OXITOFICINA
        </h1>
        <h3 className='text-md sm:text-base md:text-md font-bold text-center mb-4 pt-10'>
          Sharing knowledge between the talented and the curious.
        </h3>
        <h5 className='text-xs sm:text-sm md:text-md text-center mb-6'>
          We offer tailored{' '}
          <Link to={`/workshops`} className='text-red-500 hover:underline'>
            workshops
          </Link>{' '}
          curated by our verified, industry-leading{' '}
          <Link to={`/teachers`} className='text-red-500 hover:underline'>
            tutors and collaborators.
          </Link>
          <br />
          <br />
          We don’t follow any defined syllabus but are guided by our students'
          desires and our teachers' creativity.
          <br />
          <br />
          Let us know what you want to learn by{' '}
          <Link to={'/create-wish'} className='text-red-500 hover:underline'>
            submitting a wish
          </Link>{' '}
          on our{' '}
          <Link to={`/wishlist`} className='text-red-500 hover:underline'>
            wishlist
          </Link>{' '}
          or{' '}
          <Link to={`/signup`} className='text-red-500 hover:underline'>
            create an account
          </Link>{' '}
          and sign up to attend an upcoming workshop.
        </h5>
      </div>
    </div>
  );
  
}

export default Homepage;
