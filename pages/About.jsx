import axios from 'axios';
import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';

function About() {
  const [age, setAge] = useState(0);
  const [comment, setComment] = useState('');

  //const navigate = useNavigate();

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
      setAge(0)
      setComment('')
      //navigate('/suggestion-box');
    } catch (error) {
      console.log('error posting suggestion', error);
    }
  };
  return (
    <>
      <div className='big-about-div'>
        <h1>About OXITOFICINA</h1>
        <h3>
          here comes the text about oxitoficina here comes the text about
          oxitoficina here comes the text about oxitoficina here comes the text
          about oxitoficina here comes the text about oxitoficina here comes the
          text about oxitoficina here comes the text about oxitoficina here
          comes the text about oxitoficina here comes the text about oxitoficina
          here comes the text about oxitoficina here comes the text about
          oxitoficina here comes the text about oxitoficina here comes the text
          about oxitoficina here comes the text about oxitoficina here comes the
          text about oxitoficina here comes the text about oxitoficina here
          comes the text about oxitoficina here comes the text about oxitoficina
          here comes the text about oxitoficina here comes the text about
          oxitoficina here comes the text about oxitoficina here comes the text
          about oxitoficina here comes the text about oxitoficina{' '}
        </h3>
      </div>

      <div className='suggestion-box-input'>
        <h3>WHAT DO YOU WISH WAS DIFFERENT IN YOUR SCHOOL EXPERIENCE?</h3>
        <form
          className='signup-form'
          onSubmit={handleCommentSubmit}>
          <label htmlFor=''>Tell us your age</label>
          <br />
          <input
            type='number'
            id='age'
            value={age}
            onChange={handleAge}
          />
          <br />
          <label htmlFor=''>
            Let the world know what is your mind, there are no stupid ideas!
          </label>
          <br />
          <textarea
            name='comment'
            id='comment'
            value={comment}
            onChange={handleComment}
            placeholder='This little box is welcoming everyone to share their experience, you can be 4 years old or 120! All voices are to be heard :) and please, mind your language.'
          />
          <br />
          <button>HEAR ME!</button>
        </form>
      </div>
    </>
  );
}

export default About;
