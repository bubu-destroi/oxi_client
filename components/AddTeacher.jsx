import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AddTeacher() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [email, setEmail] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleSocialMedia = (e) => {
    setSocialMedia(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTeacher = {
        name,
        email,
        bio,
        socialMedia,
      };
      await axios.post(`${import.meta.env.VITE_API_URL}/api/teachers`, newTeacher);
      setName('');
      setEmail('');
      setBio('');
      setSocialMedia('');
     // setErrorMessage('')
    } catch (error) {
      //setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };

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
        </div>
      </div>
     
      <h3>Create a Teacher Profile</h3>
      <form className='signup-form' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <br />
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={handleName}
        />
        <br />
        <label htmlFor='bio'>Biography</label>
        <br />
        <textarea
          name='bio'
          id='bio'
          value={bio}
          onChange={handleBio}
        />
        <br />
        <label htmlFor='email'>Email</label>
        <br />
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <br />
        <label htmlFor='socialMedia'>Social Media or linkTree</label>
        <br />
        <input
          type='text'
          name='socialMedia'
          id='socialMedia'
          value={socialMedia}
          onChange={handleSocialMedia}
        />
        <br />
        <button type='submit'>create</button>
      </form>
      
    </>
  );
}

export default AddTeacher;
