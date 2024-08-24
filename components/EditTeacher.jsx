import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';


function EditTeacher() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [email, setEmail] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');
  const { teacherID } = useParams();
  const navigate = useNavigate();

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
      const updatedTeacher = {
        name,
        email,
        bio,
        socialMedia,
      };
      console.log(updatedTeacher);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/teachers/${teacherID}`,
        updatedTeacher
      );
      setName('');
      setEmail('');
      setBio('');
      setSocialMedia('');

      navigate(`/teachers/${teacherID}`);
      // setErrorMessage('')
    } catch (error) {
      //setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };

  const handleDelete = async (teacherID) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/teachers/${teacherID}`
      );
      navigate('/teachers');
    } catch (error) {
      console.log('error deleting teacher profile', error);
    }
  };

  const getSingleTeacher = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers/${id}`
      );
      setName(response.data.name);
      setBio(response.data.bio);
      setEmail(response.data.email);
      setSocialMedia(response.data.socialMedia);
      //setPrevious_workshops(response.data.previous_workshops);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleTeacher(teacherID);
  }, [teacherID]);

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
        </div>
      </div>
      <h3>Edit a Teacher Profile</h3>
      <form
        className='signup-form'
        onSubmit={handleSubmit}>
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
        <label htmlFor='email'>Email - this will remain private</label>
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
        <button type='submit'>ok, done!</button>
      </form>
      <br />
      <button
        type='submit'
        onClick={handleDelete}>
        erase this teacher profile
      </button>
    </>
  );
}

export default EditTeacher;
