import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { user, logout } = useContext(AuthContext);

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
      <h1>hello {user.learner_username}!</h1>
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
        {user.signedUp_workshops && user.signedUp_workshops.length > 0 ? (
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
        {user.userWaitingList && user.userWaitingList.length > 0 ? (
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
