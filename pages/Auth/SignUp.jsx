import  { useState } from 'react';
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
    console.log(phone_number)
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
     
      <h2 className='create-an-account'>
        create an account to sign up for workshops and tell us what you want to
        learn about!
      </h2>
      <h5>
        do you already own an account? <Link to='/login'> log in here!</Link>{' '}
      </h5>
      <form
        className='signup-form'
        action=''
        onSubmit={handleSubmit}
      >
        <p className='signup-extras'>
          we need your parents/caretaker information! if you are an adult, input
          your own information
        </p>
        <label htmlFor=''>their name</label>
        <br />
        <input
          type='text'
          name='parent-name'
          id='parent-name'
          value={parent_name}
          onChange={handleParent_name}
        />
        <br />
        <label htmlFor=''>their address</label>
        <br />
        <input
          type='text'
          name='address'
          id='address'
          value={address}
          onChange={handleAddress}
        />
        <br />
        <label htmlFor=''>their telephone number</label>
        <br />
        <div className='phone-input' style={{ display: 'flex', alignItems: 'center' }}>
          <CountryCodeSelector onCodeChange={handleCountryCodeChange} />
          <br />
        </div>
          <input
            type='text'
            value={phone_number}
            onChange={handlePhone_number}
            placeholder='phone number'
            style={{
              padding: '10px',
              backgroundColor: 'rgba(221, 220, 255, 0.997)',
              border: 'none',
              fontFamily: 'monospace',
              color: 'darkslateblue',
              flex: 1,
              marginLeft: '5px',
            }}
          />
        <br />
        <label htmlFor=''>
          upload their id card picture, just to check if it matches!
        </label>
        <br />
        <input
          type='file'
          name='id_card_picture'
          id='id_card_picture'
          onChange={handleId_card_picture}
        />
        <br />
        <label htmlFor=''>their email</label>
        <br />
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={handleEmail}
        />
        <br />
        <label
          className='signup-extras'
          htmlFor=''
        >
          create a password with at least 6 characters, one number, one
          lowercase and one uppercase letter
        </label>
        <br />
        <input
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
        <h3>ok! now your information</h3>
        <br />
        <label htmlFor=''>create a username for your profile</label>
        <br />
        <input
          type='text'
          name='learner_username'
          id='learner_username'
          value={learner_username}
          onChange={handleLearner_username}
        />
        <br />
        <label htmlFor=''>what is your date of birth?</label>
        <br />
        <input
          type='date'
          name='date_of_birth'
          id='date_of_birth'
          value={date_of_birth}
          onChange={handleDate_of_birth}
        />
        <br />
        <button type='submit'>CREATE!</button>
      </form>
    </>
  );
}

export default SignUp;
