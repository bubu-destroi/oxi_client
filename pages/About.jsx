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
    <>
      <div className='big-about-div'>
        <h1>About OXITOFICINA</h1>
        <h5>
          Hi, I'm Carolina. I created Oxitoficina (combining Oxytocin and
          Oficina) from a place of deep affection and concern for future
          generations. Throughout my own experience of the traditional education
          system, both as student and as teacher, I've witnessed how the current
          system fails to realize students full potential. Talented teachers do
          the best with the few resources they are given; however, strict
          schedules and out-of-date syllabuses are primarily taught in
          unforgiving environments, leading to generations of unmotivated
          children and unfulfilled adults. <br />
          <br /> With this in mind, I believe a safe space is needed for curious
          minds to explore subjects of their interest. Freedom to think
          creatively, making mistakes and asking for help from others are all
          skills often neglected in formal education, despite being essential
          for thriving in any career. <br />
          <br />
          To rectify this, Oxitoficina is offered as complement (not a
          replacement), of traditional education. By listening to our students
          suggestions, and then designing workshops for their needs, we aspire
          to provide a broader scope of subjects that students truly want to
          learn about. As such, there are no restrictions on what they can
          learn. One week it could be philosophy, another creative writing, and
          another still their IRS tax return. If there is the demand, we will
          offer it! Expecting, and even hoping for, ideas we could never even
          think of.{' '}
        </h5>
        <div className='suggestion-box-input'>
          <h4>
            And now, I ask you, could you be a{' '}
            <Link to={'/voices-of-progress'}>voice of progress</Link> and tell
            me
          </h4>
          <h3>WHAT DO YOU WISH WAS DIFFERENT IN YOUR SCHOOL EXPERIENCE?</h3>
          <form
            className='signup-form'
            onSubmit={handleCommentSubmit}>
            <label htmlFor=''>Your age</label>
            <br />
            <input
              type='number'
              id='age'
              value={age}
              onChange={handleAge}
            />
            <br />
            <label htmlFor=''>
              Let the world know what is on your mind, there are no stupid
              ideas!
            </label>
            <br />
            <textarea
              name='comment'
              id='comment'
              value={comment}
              onChange={handleComment}
              placeholder='This little box is welcoming everyone to share their experience, as a student, former student, a parent or a teacher, you can be 4 years old or 120! All voices are to be heard :) and please, mind your language.'
            />
            <br />
            <button>HEAR ME!</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default About;
