import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function About() {
  const [age, setAge] = useState(0);
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSuggestion = {
        age,
        comment,
      };
      console.log(newSuggestion);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/suggestions`,
        newSuggestion
      );
      setAge(0);
      setComment('');
      navigate('/voices-of-progress');
    } catch (error) {
      console.log('error posting suggestion', error);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-20 p-4'>
      <div className='w-full max-w-xl p-5'>
        <h1 className='text-2xl font-bold mb-4 text-center pt-10'>
          About OXITOFICINA
        </h1>
        <p className='text-xs sm:text-sm  md:text-s mb-6 text-justify'>
          {' '}
          Hi, I'm Zarolina. I created Oxitoficina (combining Oxytocin and
          Oficina) from a place of deep affection and concern for future
          generations. Throughout my own experience of the traditional education
          system, both as student and as teacher, I've witnessed how the current
          system fails to realize students full potential. Talented teachers do
          the best with the few resources they are given; however, strict
          schedules and out-of-date syllabuses are primarily taught in
          unforgiving environments, leading to generations of unmotivated
          children and unfulfilled adults.
          <br />
          <br />
          With this in mind, I believe a safe space is needed for curious minds
          to explore subjects of their interest. Freedom to think creatively,
          making mistakes and asking for help from others are all skills often
          neglected in formal education, despite being essential for thriving in
          any career.
          <br />
          <br />
          To rectify this, Oxitoficina is offered as a complement (not a
          replacement) of traditional education. By listening to our students'
          suggestions, and then designing workshops for their needs, we aspire
          to provide a broader scope of subjects that students truly want to
          learn about. As such, there are no restrictions on what they can
          learn. One week it could be philosophy, another creative writing, and
          another still their IRS tax return. If there is the demand, we will
          offer it! Expecting, and even hoping for, ideas we could never even
          think of.
        </p>
        <div className='text-center mb-6'>
          <h4 className='text-xs sm:text-sm md:text-s mb-6'>
            And now, I ask you, could you be a{' '}
            <Link
              to='/voices-of-progress'
              className='text-red-500 hover'>
              voice of progress
            </Link>{' '}
            and tell me
          </h4>
          <h3 className='text-s sm:text-base md:text-sm font-bold mt-2'>
            WHAT DO YOU WISH WAS DIFFERENT IN YOUR SCHOOL EXPERIENCE?
          </h3>
        </div>
        <form
          className='space-y-4'
          onSubmit={handleCommentSubmit}>
          <label
            htmlFor='age'
            className='block text-xs font-medium  px-3'>
            Your age
          </label>
          <input
            type='number'
            id='age'
            value={age}
            onChange={handleAge}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none'
            placeholder='Enter your age'
          />
          <label
            htmlFor='comment'
            className='block text-xs font-medium py-2 px-3'>
            Let the world know what is on your mind, there are no stupid ideas!
          </label>
          <textarea
            name='comment'
            id='comment'
            value={comment}
            onChange={handleComment}
            placeholder='This little box is welcoming everyone to share their experience, as a student, former student, a parent or a teacher, you can be 4 years old or 120! All voices are to be heard :) and please, mind your language.'
            className='block w-full  mt-1 text-xs bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
            rows='6'
          />
          <button
            type='submit'
            className='w-full bg-red-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-4'>
            HEAR ME!
          </button>
        </form>
      </div>
      <a href='mailto:hello@zarolina.com'>
        <div className='p-6   hover:text-red-500 cursor-pointer text-center'>
         - Contact me -
        </div>
      </a>
    </div>
  );
}

export default About;
