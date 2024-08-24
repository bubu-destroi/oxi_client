import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  //const [errorMessage, setErrorMessage] = useState(null);
  const { storeToken, authenticateUser, updatedUser, user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      storeToken(response.data.authToken);
      console.log(response.data.authToken);
      await authenticateUser();
      console.log('this is the updatedUser', updatedUser);
    } catch (error) {
      console.log('not logged in because', error);
      //setErrorMessage(error.response.data.message);
      //console.log(errorMessage)
    }
  };
  useEffect(() => {
    if (user && user._id) {
      console.log('Navigating to profile with user:', user);
      navigate(`/profile/${user._id}`);
    }
  }, [user, navigate]);
  return (
    <>

    <div className='loginPage'>
      <h2>please log in to start learning!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>your email</label>
        <br />
        <input
          className='login-signup'
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <br />
        <label htmlFor='password'>your password</label>
        <br />
        <input
          className='login-signup'
          type={showPassword ? 'text' : 'password'}
          name='password'
          id='password'
          value={password}
          onChange={handlePassword}
        />
        <br />
        <input
          type='checkbox'
          id='show-password'
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
        <label htmlFor='show-password'>Show Password</label>
        <br />
        <button type='submit'>lets go!</button>
      </form>
      {/* {errorMessage && <p>{errorMessage}</p>} */}
      <p>you do not own an account yet?</p>
      <Link to='/signup'>create your account here</Link>
      {/*  <p>or log out!</p>
      <button
        type='submit'
        onClick={logout}>
        logout
      </button> */}
    </div>
    </>
  );
}

export default Login;
