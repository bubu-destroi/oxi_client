import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router-dom';

function AddWish() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [remote, setRemote] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubcategory = (e) => {
    setSubcategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const newWish = {
          title,
          description,
          category,
          subcategory,
          remote,
          age_of_wisher: user.age,
          userID: user._id,
          created_by: user._id,
        };
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          newWish
        );
        navigate(`/profile/${user._id}`);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen pt-20 p-4 '>
      <h2 className='text-xl sm:text-l font-bold pt-12 mb-4 text-center md:max-w-lg'>
        Tell us what you want to learn about!
      </h2>
      <form
        className='w-full max-w-md p-6'
        onSubmit={handleSubmit}>
        <label
          htmlFor='title'
          className='block text-xs font-medium '>
          Title * 
        </label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleTitle}
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
          placeholder='Title is required for submission'
        />
        <label
          htmlFor='description'
          className='block text-xs font-medium  mt-4'>
          Description *
        </label>
       {/*  <h5 className='text-xs mb-4 p-4 text-gray-700  text-justify'>
          Here you can tell us all the most important details, like the best
          location for you or what languages you are comfortable with.
        </h5> */}
        <textarea
          name='description'
          id='description'
          value={description}
          onChange={handleDescription}
          className='block w-full h-auto mt-1 text-xs bg-[rgba(221,220,255,0.997)] py-10 px-4  focus:outline-none text-justify'
          placeholder='Description is required for submission. Here you can tell us all the most important details, like the best location for you or what languages you are comfortable with.'
        />
        <label
          htmlFor='category'
          className='block text-xs font-medium mt-4'>
          Category
        </label>
        <input
          type='text'
          name='category'
          id='category'
          value={category}
          onChange={handleCategory}
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3  focus:outline-none'
          placeholder='Enter the category'
        />
        <label
          htmlFor='subcategory'
          className='block text-xs font-medium  mt-4'>
          Subcategory
        </label>
        <input
          type='text'
          name='subcategory'
          id='subcategory'
          value={subcategory}
          onChange={handleSubcategory}
          className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none'
          placeholder='Enter the subcategory'
        />
        <label
          htmlFor='remote'
          className='block text-xs font-medium  mt-4'>
          Remote?
        </label>
        <input
          name='remote'
          id='remote'
          type='checkbox'
          checked={remote}
          onChange={(e) => setRemote(e.target.checked)}
          className='mr-2 mt-1'
        />
        <button
          type='submit'
          className='w-full bg-red-500 text-white py-2 px-4 mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'>
          OK! Click here to make your request
        </button>
      </form>
    </div>
  );
}

export default AddWish;
