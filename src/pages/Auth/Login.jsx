import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State for error messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { storeToken, authenticateUser, updatedUser, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Basic validation
  const validateInputs = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is not valid.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      storeToken(response.data.authToken);
      await authenticateUser();
      console.log('this is the updatedUser', updatedUser);
    } catch (error) {
      console.log('Login error:', error.response?.data?.message || error.message);
      setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  useEffect(() => {
    if (user && user._id) {
      navigate(`/profile/${user._id}`);
    }
  }, [user, navigate]);

  return (
    <div className='flex items-center justify-center min-h-screen p-4'>
      <div className='max-w-md w-full'>
        <h2 className='text-xl sm:text-2xl font-bold mb-4 text-center'>
          Please log in to start learning!
        </h2>
        <form
          onSubmit={handleSubmit}
          className='space-y-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'>
              Your email
            </label>
            <input
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] rounded-md py-2 px-3 focus:outline-none'
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmail}
              placeholder='Enter your email'
            />
            {emailError && <p className='text-red-500 text-sm mt-1'>{emailError}</p>}
          </div>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700'>
              Your password
            </label>
            <input
              className='block w-full mt-1 bg-[rgba(221,220,255,0.997)] rounded-md py-2 px-3 focus:outline-none'
              type={showPassword ? 'text' : 'password'}
              name='password'
              id='password'
              value={password}
              onChange={handlePassword}
              placeholder='Enter your password'
            />
            {passwordError && <p className='text-red-500 text-sm mt-1'>{passwordError}</p>}
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              id='show-password'
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className='mr-2'
            />
            <label
              htmlFor='show-password'
              className='text-sm text-gray-600'>
              Show Password
            </label>
          </div>
        {errorMessage && <p className='mt-4 flex justify-center text-center text-red-500'>{errorMessage}</p>}
          <div className='flex justify-center'>
            <br />
            <button
              type='submit'
              className='bg-red-500 text-white py-2 px-4  hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'>
              Let's go!
            </button>
          </div>
        </form>
        <p className='mt-4 text-center text-sm sm:text-base'>
          You do not own an account yet?
        </p>
        <Link
          to='/signup'
          className='block text-center text-red-500 hover:underline mt-2 text-sm sm:text-base'>
          Create your account here
        </Link>
      </div>
    </div>
  );
}

export default Login;
