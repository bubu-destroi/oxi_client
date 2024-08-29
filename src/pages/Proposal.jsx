//create teacher profile, if multiple teachers, collective or school, provide such information in description input.
//after create - put(/candidates) - create new route for this, then navigate('/new-proposal')
//proposal is workshop schema but add AVAILABILITY  - put('/proposals')- create new route for this
//

import { useEffect, useState } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

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
    <div className='flex flex-col items-center justify-center min-h-screen p-4 pl-6 pr-6 pt-20'>
      <div className='w-full max-w-xl'>
        <h1 className='text-lg font-bold mb-4 text-center pt-10'>
          SUBMIT YOUR PROPOSAL
        </h1>
        <p className='text-xs sm:text-xs md:text-base mb-6 text-center'>
          Here you will provide as much detailed information as you can, and
          upon submission, the proposal will be sent via email, and you will be
          contacted as soon as possible.
        </p>
        <h3 className='text-md font-bold mb-4 text-center'>
          First, create a Teacher Profile
        </h3>
        <h6 className='text-xs sm:text-xs md:text-base mb-1 text-center pr-6 text-red-500 opacity-50'>
          In case of multiple teachers, collective or school, input this
          information in the biography field.
        </h6>
        <form
          className='space-y-4'
          onSubmit={handleSubmit}>
          <label
            htmlFor='name'
            className='block text-xs font-medium'>
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={name}
            onChange={handleName}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter your name'
          />

          <label
            htmlFor='bio'
            className='block text-xs font-medium'>
            Biography
          </label>
          <textarea
            name='bio'
            id='bio'
            value={bio}
            onChange={handleBio}
            className='block w-full mt-1 text-xs bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Let me know who you are, what are your interests, why you are interested in joining this project...'
            rows='4'
          />

          <label
            htmlFor='email'
            className='block text-xs font-medium'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={handleEmail}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Your email'
          />

          <label
            htmlFor='socialMedia'
            className='block text-xs font-medium'>
            Social Media or linkTree
          </label>
          <input
            type='text'
            name='socialMedia'
            id='socialMedia'
            value={socialMedia}
            onChange={handleSocialMedia}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter your social media or linkTree'
          />

          <h3 className='text-lg font-bold mb-4 text-center'>
            Design a Workshop Proposal
          </h3>

          <label
            htmlFor='title'
            className='block text-xs font-medium'>
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={handleTitle}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter the workshop title'
          />

          <label
            htmlFor='description'
            className='block text-xs font-medium'>
            Description
          </label>
          <h6 className='text-xs sm:text-xs md:text-base mb-6 text-center pr-6 text-red-500 opacity-50'>
            Provide all necessary information including languages, availability,
            required resources, and estimated budget. <br />
            Be clear with your idea! Mention the WISH you are responding to, if
            applicable.
          </h6>

          <textarea
            name='description'
            id='description'
            value={description}
            onChange={handleDescription}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1 text-xs focus:outline-none'
            placeholder='Describe your workshop'
            rows='4'
          />

          <label
            htmlFor='image'
            className='block text-xs font-medium'>
            Upload an image
          </label>
          <input
            type='file'
            name='image'
            id='image'
            onChange={handleImage}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
          />

          <label
            htmlFor='price'
            className='block text-xs font-medium'>
            Estimated price in Euros per participant
          </label>
          <input
            type='number'
            name='price'
            id='price'
            value={price}
            onChange={handlePrice}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter the price'
          />

          <label
            htmlFor='category'
            className='block text-xs font-medium'>
            Select a category
          </label>
          <input
            type='text'
            name='category'
            id='category'
            value={category}
            onChange={handleCategory}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter a category'
          />

          <label
            htmlFor='subcategory'
            className='block text-xs font-medium'>
            And a subcategory
          </label>
          <input
            type='text'
            name='subcategory'
            id='subcategory'
            value={subcategory}
            onChange={handleSubcategory}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter a subcategory'
          />

          <label
            htmlFor='duration'
            className='block text-xs font-medium'>
            Duration - hours, days, weeks...?
          </label>
          <input
            type='text'
            name='duration'
            id='duration'
            value={duration}
            onChange={handleDuration}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter the duration'
          />

          <label
            htmlFor='date'
            className='block text-xs font-medium'>
            Select a starting date
          </label>
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
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
          />
          <h6 className='text-xs sm:text-xs md:text-base mb-1 text-center pr-6 text-red-500 opacity-50'>
            If you have flexible availability, mention it in the description
            field.
          </h6>

          <label
            htmlFor='teacher'
            className='block text-xs font-medium'>
            Teacher
          </label>
          <input
            type='text'
            name='teacher'
            id='teacher'
            value={name}
            onChange={handleName}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter teacher name'
          />

          <label
            htmlFor='remote'
            className='block text-xs font-medium'>
            Remote?
          </label>
          <input
            type='checkbox'
            name='remote'
            id='remote'
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)}
            className='block mt-1'
          />

          <label
            htmlFor='place'
            className='block text-xs font-medium'>
            Location
          </label>
          <input
            type='text'
            name='place'
            id='place'
            value={place}
            onChange={handlePlace}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter location'
          />

          <label
            htmlFor='minimum_age'
            className='block text-xs font-medium'>
            Minimum age of participants
          </label>
          <input
            type='number'
            name='minimum_age'
            id='minimum_age'
            value={minimum_age}
            onChange={handleMinimum_age}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter minimum age'
          />

          <label
            htmlFor='maximum_age'
            className='block text-xs font-medium'>
            Maximum age of participants
          </label>
          <input
            type='number'
            name='maximum_age'
            id='maximum_age'
            value={maximum_age}
            onChange={handleMaximum_age}
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            placeholder='Enter maximum age'
          />

          <br />
          <label htmlFor='minParticipants'>
            Minimum number of participants
          </label>
          <br />
          <input
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            type='number'
            name='minParticipants'
            id='minParticipants'
            value={minParticipants}
            onChange={handleMinParticipants}
          />
          <br />
          <label htmlFor='maxParticipants'>
            Maximum number of participants
          </label>
          <br />
          <input
            className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 p-1  focus:outline-none'
            type='number'
            name='maxParticipants'
            id='maxParticipants'
            value={maxParticipants}
            onChange={handleMaxParticipants}
          />
          <br />
          {/* <button type='submit'>create</button> */}
          <button
            type='submit'
            className='w-full bg-red-500 text-white py-2 px-4  hover:bg-blue-600 focus:outline-none'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Proposal;
