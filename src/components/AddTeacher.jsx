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
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/teachers`,
        newTeacher
      );
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
      <div className='flex flex-col items-center justify-center min-h-screen pt-20 p-4 '>
        <h2 className='text-xl sm:text-l font-bold pt-12 mb-4 text-center md:max-w-lg'>
          Create a Teacher Profile
        </h2>
        <form
          className='w-full max-w-md p-6'
          onSubmit={handleSubmit}>
          <label htmlFor='name' className='block text-xs font-medium '>Name</label>
          <br />
          <input
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
         
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={handleName}
          />
          <br />
          <label  htmlFor='bio' className='block text-xs font-medium  mt-4'>
          Biography</label>
          <br />
          <textarea
          className='block w-full h-auto mt-1 text-xs bg-[rgba(221,220,255,0.997)] py-10 px-4  focus:outline-none text-justify'
         
            name='bio'
            id='bio'
            value={bio}
            onChange={handleBio}
          />
          <br />
          <label htmlFor='email'>Email</label>
          <br />
          <input
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
         
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
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
         
            type='text'
            name='socialMedia'
            id='socialMedia'
            value={socialMedia}
            onChange={handleSocialMedia}
          />
          <br />
          <button type='submit' className='w-full bg-red-500 text-white py-2 px-4 mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
          create</button>
        </form>
      </div>
    </>
  );
}

export default AddTeacher;
