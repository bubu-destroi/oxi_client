import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${user._id}`
          );
          updateUser(response.data);
          setLoading(false);
        } catch (error) {
          console.log('error', error);
          setLoading(false);
        }
      }
    };
    fetchUserData();
  },[user._id]);
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;
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
      <h1>hello {user.learner_name}!</h1>
      <h3>these are the wishes you requested</h3>
      <div>
        {user.wishes && user.wishes.length > 0 ? (
          user.wishes.map((wish) => (
            <div key={wish._id}>
              <h5>{wish.title}</h5>
            </div>
          ))
        ) : (
          <p>You have no wishes listed.</p>
        )}
      </div>

      <h3>you are signed up for the following workshops</h3>
      <div>
        {user.signedUp_workshops &&
        user.signedUp_workshops.length > 0 ? (
          user.signedUp_workshops.map((workshop) => (
            <div key={workshop._id}>
              <h5>{workshop.title}</h5>
            </div>
          ))
        ) : (
          <p>you are not signed up for any workshops</p>
        )}
      </div>
      <h3>you are in the waiting list for the following workhops</h3>
      <div>
        {user.userWaitingList &&
        user.userWaitingList.length > 0 ? (
          user.userWaitingList.map((workshop) => (
            <div key={workshop._id}>
              <h5>{workshop.title}</h5>
            </div>
          ))
        ) : (
          <p>You are not listed for any workshops waiting list.</p>
        )}
      </div>

      <button onClick={logout}>Logout</button>
    </>
  );
}

export default ProfilePage;
