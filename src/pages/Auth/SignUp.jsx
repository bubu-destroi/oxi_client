import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CountryCodeSelector from '../CountryCodeSelector'; // Ensure the path is correct

function SignUp() {
  const [parent_name, setParent_name] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [countryCode, setCountryCode] = useState('+351');
  const [id_card_picture, setId_card_picture] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [learner_username, setLearner_username] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [age, setAge] = useState(null);
  const wishes = [];
  const signedUp_workshops = [];
  const userWaitingList = [];
  const courses_taken = [];
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleParent_name = (e) => {
    setParent_name(e.target.value);
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlePhone_number = (e) => {
    setPhone_number(e.target.value);
  };

  const handleCountryCodeChange = (code) => {
    setCountryCode(code);
    console.log(phone_number);
  };

  const handleId_card_picture = async (e) => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      setLoading(false);
      setId_card_picture(response.data.fileUrl);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLearner_username = (e) => {
    setLearner_username(e.target.value);
  };
  const handleAge = () => {
    const birthDate = new Date(date_of_birth);
    const today = new Date();
    let ageTotal = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      ageTotal--;
    }
    setAge(ageTotal);
  };
  const handleDate_of_birth = (e) => {
    setDate_of_birth(e.target.value);
    handleAge();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserProfile = {
        parent_name,
        address,
        phone_number: `${countryCode}${phone_number}`,
        id_card_picture,
        email,
        password,
        learner_username,
        date_of_birth,
        age,
        wishes,
        signedUp_workshops,
        userWaitingList,
        courses_taken,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        newUserProfile
      );
      navigate('/login');
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <>
      <div className='flex items-center justify-center min-h-screen pt-20 p-4'>
        <div className='max-w-md w-full'>
          <h2 className='text-xl sm:text-l font-bold px-10 pt-10 mb-4 text-center md:max-w-lg '>
            Create an account <br/>
            </h2>
          <h3 className='text-l font-semibold mt-6 px-10  mb-4 text-center md:max-w-lg '>
to sign up for workshops and tell us what you want to learn about!
          
          </h3>
          <h5 className='text-xs sm:text-xs  mb-4 flex flex-col items-center justify-center'>
            Do you already own an account?{' '}
            <Link
              to='/login'
              className='text-red-500 hover:text-blue-500 mt-5'>
              Log in here!
            </Link>
          </h5>
          <form
            className='w-full max-w-md p-6 '
            onSubmit={handleSubmit}>
            <p className='text-xs mb-4 text-center'>
              We need your parents/caretaker information! If you are an adult,
              input your own information.
            </p>
            <label
              htmlFor='parent-name'
              className='block text-xs font-medium text-gray-700'>
              Their name
            </label>
            <input
              type='text'
              name='parent-name'
              id='parent-name'
              value={parent_name}
              onChange={handleParent_name}
              className=' block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
              placeholder='Enter their name'
            />
            <label
              htmlFor='address'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Their address
            </label>
            <input
              type='text'
              name='address'
              id='address'
              value={address}
              onChange={handleAddress}
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
              placeholder='Enter their address'
            />
            <label
              htmlFor='phone-number'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Their telephone number
            </label>
            <div className='flex items-center'>
              <CountryCodeSelector onCodeChange={handleCountryCodeChange} />
              <input
                type='text'
                value={phone_number}
                onChange={handlePhone_number}
                placeholder='Phone number'
                className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none ml-2'
              />
            </div>
            <label
              htmlFor='id_card_picture'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Upload their ID card picture
            </label>
            <input
              type='file'
              name='id_card_picture'
              id='id_card_picture'
              onChange={handleId_card_picture}
              className='block w-full mt-1'
            />
            <label
              htmlFor='email'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Their email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmail}
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
              placeholder='Enter their email'
            />
            <label
              htmlFor='password'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Create a password with at least 6 characters, one number, one
              lowercase and one uppercase letter
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={password}
              onChange={handlePassword}
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
              placeholder='Enter your password'
            />
            <div className='flex items-center mt-2'>
              <input
                type='checkbox'
                id='show-password'
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                className='mr-2'
              />
              <label
                htmlFor='show-password'
                className='text-xs  text-gray-600'>
                Show Password
              </label>
            </div>
            <h3 className='text-lg font-semibold mt-6'>
              Ok! Now your information
            </h3>
            <label
              htmlFor='learner_username'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              Create a username for your profile
            </label>
            <input
              type='text'
              name='learner_username'
              id='learner_username'
              value={learner_username}
              onChange={handleLearner_username}
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
              placeholder='Enter your username'
            />
            <label
              htmlFor='date_of_birth'
              className='block text-xs  font-medium text-gray-700 mt-4'>
              What is your date of birth?
            </label>
            <input
              type='date'
              name='date_of_birth'
              id='date_of_birth'
              value={date_of_birth}
              onChange={handleDate_of_birth}
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 rounded-md focus:outline-none'
            />
            <button
              type='submit'
              className='w-full bg-red-500 text-white py-2 px-4  hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-6'>
              CREATE!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
