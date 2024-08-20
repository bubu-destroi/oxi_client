//create teacher profile, if multiple teachers, collective or school, provide such information in description input.
//after create - put(/candidates) - create new route for this, then navigate('/new-proposal')
//proposal is workshop schema but add AVAILABILITY  - put('/proposals')- create new route for this
//

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Proposal() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socialMedia, setSocialMedia] = useState('');
  const [email, setEmail] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [remote, setRemote] = useState(false);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [teachers, setTeachers] = useState(name);
  const [minimum_age, setMinimum_age] = useState(1);
  const [maximum_age, setMaximum_age] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [minParticipants, setMinParticipants] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleName = (e) => {
    setName(e.target.value);
    setTeachers(name);
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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleImage = async (e) => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      console.log(response.data.fileUrl);
      setLoading(false);
      setImage(response.data.fileUrl);
    } catch (error) {
      console.log(loading);
      console.error(error);
    }
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubcategory = (e) => {
    setSubcategory(e.target.value);
  };
  /*  const handleRemote = () => {
    console.log(remote);
  }; */
  const handlePlace = (e) => {
    setPlace(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleMinimum_age = (e) => {
    setMinimum_age(e.target.value);
  };
  const handleMaximum_age = (e) => {
    setMaximum_age(e.target.value);
  };
  const handleMaxParticipants = (e) => {
    setMaxParticipants(e.target.value);
  };
  const handleMinParticipants = (e) => {
    setMinParticipants(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProposal = {
        title,
        description,
        image,
        duration,
        teachers,
        price: Number(price),
        category,
        subcategory,
        remote,
        place,
        date,
        name,
        bio,
        socialMedia,
        email,
        minimum_age: Number(minimum_age),
        maximum_age: Number(maximum_age),
        maxParticipants: Number(maxParticipants),
        minParticipants: Number(minParticipants),
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/proposals`,
        newProposal
      );

      setName('');
      setEmail('');
      setBio('');
      setSocialMedia('');
      setTitle('');
      setDescription('');
      setImage('');
      setDuration('');
      setPrice('');
      setCategory('');
      setSubcategory('');
      setRemote(false);
      setPlace('');
      setDate('');
      setMinimum_age('');
      setMaximum_age('');
      setMaxParticipants('');
      setMinParticipants(1);
      // setErrorMessage('')
    } catch (error) {
      //setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };

  useEffect(() => {
    setName;
    console.log(remote);
  }, [name, remote]);

  return (
    <>
      <div className='logo-div'>
        <Link to={'/'}>
          <img
            src='/oxito.png'
            alt='oxitoficina-logo'
          />
        </Link>
      </div>
      <h1>SUBMIT YOUR PROPOSAL</h1>
      <h6 className='proposal-extras'>
        Here you will provide as much detailed information as you can and, uppon
        submit, the proposal will be sent via email and you will be contacted as
        soon as possible
      </h6>
      <h3>First, create a Teacher Profile</h3>
      <h6 className='proposal-extras'>
        in case of multiple teachers, collective or school, input these
        informations in the biography field.
      </h6>
      <form
        className='proposal-form'
        onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          id='name'
          value={name}
          onChange={handleName}
        />
        <br />
        <label htmlFor='bio'>Biography</label>
        <textarea
          name='bio'
          id='bio'
          value={bio}
          onChange={handleBio}
        />
        <br />
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <br />
        <label htmlFor='socialMedia'>Social Media or linkTree</label>
        <input
          type='text'
          name='socialMedia'
          id='socialMedia'
          value={socialMedia}
          onChange={handleSocialMedia}
        />
        <br />
        {/*  <button type='submit'>create</button> */}

        <br />

        <h3>Create a Workshop Proposal</h3>

        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleTitle}
        />
        <br />
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          value={description}
          onChange={handleDescription}
        />
        <h6 className='proposal-extras'>
          In the description field you should provide all the information you
          feel like adding, besides the other input fields, such as all the
          languages you are comfortable with, availability, required resources
          or total estimated budget. Be sure to be clear with your idea! Might
          be a good idea to mention the WISH you are responding to...
        </h6>
        <br />
        <label htmlFor='image'>Upload an image</label>
        <input
          type='file'
          name='image'
          id='image'
          onChange={handleImage}
        />
        <br />
        <label htmlFor='duration'>Duration - hours, days, weeks...?</label>
        <input
          type='text'
          name='duration'
          id='duration'
          value={duration}
          onChange={handleDuration}
        />
        <br />
        <label htmlFor='price'>
          an estimated price, in Euros, to charge per participant
        </label>
        <input
          type='number'
          name='price'
          id='price'
          value={price}
          onChange={handlePrice}
        />
        <br />
        <label htmlFor='category'>Select a category</label>
        <input
          type='text'
          name='category'
          id='category'
          value={category}
          onChange={handleCategory}
        />
        <br />
        <label htmlFor='subcategory'>And a subcategory</label>
        <input
          type='text'
          name='subcategory'
          id='subcategory'
          value={subcategory}
          onChange={handleSubcategory}
        />
        <br />
        <label htmlFor='date'>Input a starting date</label>
        <input
          type='date'
          name='date'
          id='date'
          min={
            new Date(new Date().setDate(new Date().getDate() + 1))
              .toISOString()
              .split('T')[0]
          }
          value={date}
          onChange={handleDate}
        />
        <h6 className='proposal-extras'>
          {' '}
          in case you have a flexible availability, say so in the description
          field
        </h6>
        <br />
        <label htmlFor='teacher'>Teacher</label>
        <input
          name='teacher'
          id='teacher'
          value={name}
          onChange={handleName}
        />
        <br />
        <label htmlFor='remote'>Remote?</label>
        <input
          type='checkbox'
          name='remote'
          id='remote'
          checked={remote}
          onChange={(e) => setRemote(e.target.checked)}
        />

        <br />
        <label htmlFor='place'>Place</label>
        <input
          type='text'
          name='place'
          id='place'
          value={place}
          onChange={handlePlace}
        />
        <br />
        <label htmlFor='minimum_age'>Minimum age of participants</label>
        <input
          type='number'
          name='minimum_age'
          id='minimum_age'
          value={minimum_age}
          onChange={handleMinimum_age}
        />
        <br />
        <label htmlFor='maximum_age'>Maximum age of participants</label>
        <input
          type='number'
          name='maximum_age'
          id='maximum_age'
          value={maximum_age}
          onChange={handleMaximum_age}
        />
        <br />
        <label htmlFor='minParticipants'>Minimum number of participants</label>
        <input
          type='number'
          name='minParticipants'
          id='minParticipants'
          value={minParticipants}
          onChange={handleMinParticipants}
        />
        <br />
        <label htmlFor='maxParticipants'>Maximum number of participants</label>
        <input
          type='number'
          name='maxParticipants'
          id='maxParticipants'
          value={maxParticipants}
          onChange={handleMaxParticipants}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default Proposal;
