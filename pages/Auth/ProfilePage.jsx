import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();

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
    console.log(userID);

    //ESTA DEPENDENCY PODE DAR PROBLEMAS, EU TIREI AS ANTERIORES PORQUE ESTAVA MOUNTING NONSTOP
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;
  return (
    <>
      <div className='logo-div'>
        <Link to='/'>
          <img
            src='../src/assets/oxito.png'
            alt='oxitoficina-logo'
          />
        </Link>
      </div>
      <h1>hello {user.learner_username && user.learner_username}!</h1>
      <h3>these are the wishes you requested</h3>
      <div>
        {user.wishes && user.wishes.length > 0 ? (
          user.wishes.map((wish) => (
            <div key={wish._id}>
              <Link to={`/wishlist/${wish._id}`}>
                <h5>{wish.title}</h5>
              </Link>
            </div>
          ))
        ) : (
          <p>You have no wishes listed.</p>
        )}
      </div>

      <h3>you are signed up for the following workshops</h3>
      <div>
        {user.signedUp_workshops && user.signedUp_workshops.length > 0 ? (
          user.signedUp_workshops.map((workshop) => (
            <div key={workshop._id}>
              <Link to={`/workshops/${workshop._id}`}>
                <h5>{workshop.title}</h5>
              </Link>
            </div>
          ))
        ) : (
          <p>you are not signed up for any workshops</p>
        )}
      </div>
      <h3>you are in the waiting list for the following workhops</h3>
      <div>
        {user.userWaitingList && user.userWaitingList.length > 0 ? (
          user.userWaitingList.map((workshop) => (
            <div key={workshop._id}>
              <Link to={`/workshops/${workshop._id}`}>
                <h5>{workshop.title}</h5>
              </Link>
            </div>
          ))
        ) : (
          <p>You are not listed for any workshops waiting list.</p>
        )}
      </div>
      <h3>you showed interest in these wishes</h3>
      <div>
        {user.userWishWaitingList && user.userWishWaitingList.length > 0 ? (
          user.userWishWaitingList.map((wish) => (
            <div key={wish._id}>
              <Link to={`/wishlist/${wish._id}`}>
                <h5>{wish.title}</h5>
              </Link>
            </div>
          ))
        ) : (
          <p>Go check our wishlist and be surprised!!</p>
        )}
      </div>

      <button onClick={logout}>Logout</button>
    </>
  );
}

export default ProfilePage;
