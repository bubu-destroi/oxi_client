import { useState } from 'react';
import axios from 'axios';

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
      <h3>Create a Teacher Profile</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={handleName}
        />
        <label htmlFor='bio'>Biography</label>
        <textarea
          name='bio'
          id='bio'
          value={bio}
          onChange={handleBio}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <label htmlFor='socialMedia'>Social Media or linkTree</label>
        <input
          type='text'
          name='socialMedia'
          id='socialMedia'
          value={socialMedia}
          onChange={handleSocialMedia}
        />
        <button type='submit'>create</button>
      </form>
      
    </>
  );
}

export default AddTeacher;
