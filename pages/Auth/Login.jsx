import { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const { storeToken, authenticateUser } = useContext(AuthContext);

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
      authenticateUser();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <div className='loginPage'>
      <h2>please log in to start learning!</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>your email</label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <label htmlFor='password'>your password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handlePassword}
        />
        <button type='submit'>lets go!</button>
      </form>
      {errorMessage && <p>{errorMessage}</p> }
      <p>don't have an account?</p>
      <Link to='/signup'>create your account here</Link>
    </div>
  );
}

export default Login
