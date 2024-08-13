import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
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
    console.log('Form submitted');
    if (user) {
      try {
        const newWish = {
          title,
          description,
          category,
          subcategory,
          remote,
          age_of_wisher: user.age,
          userID: user._id
        };
        console.log(newWish);
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/wishlist`,
          newWish
        );
        console.log('Wish successfully posted');
      } catch (error) {
        console.log('error', error);
      }
    } else {
      navigate('/signup');
    }
  };

  return (
    <>
      <div className='logo-div'>
        <Link to={'/'}>
          <img
            src='../src/assets/oxito.png'
            alt='oxitoficina-logo'
          />
        </Link>
      </div>
      <div>
        <h1>Tell us what you want to learn about!</h1>
        <form onSubmit={handleSubmit}>
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
          <label htmlFor='subcategory'>Type a subcategory</label>
          <input
            type='text'
            name='subcategory'
            id='subcategory'
            value={subcategory}
            onChange={handleSubcategory}
          />
          <br />
          <label htmlFor='remote'>Remote?</label>
          <input
            name='remote' 
            id='remote'
            type='checkbox'
            checked={remote}
            onChange={(e) => setRemote(e.target.checked)} // Corrected logic for setting remote
          />
          <br />
          <button type='submit'>ok! click here to make your request</button>
        </form>
      </div>
    </>
  );
}

export default AddWish;
