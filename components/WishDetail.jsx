import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';

const WishDetail = () => {
  const { user } = useContext(AuthContext);

  const [singleWish, setSingleWish] = useState(null);

  //const [errorMessage, setErrorMessage] = useState('');
  const { wishID } = useParams();
  const navigate = useNavigate();

  const getSingleWish = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`
      );
      setSingleWish(response.data);
      console.log(response.data);
      //console.log('user id', user._id, 'created_by', singleWish.created_by);
    } catch (error) {
      console.log('error', error);
    }
  };

  //const creatorID = singleWish.created_by
  //console.log('creator ID is ',creatorID)

  useEffect(() => {
    getSingleWish(wishID);
  }, [wishID]);

  useEffect(() => {
    if (singleWish) {
      //console.log('singleWish:', singleWish);
      //console.log('user id:', user._id, 'created_by:', singleWish.created_by);
    }
  }, [singleWish]);

  console.log('singlewish ', singleWish);
  /*   const handleEditDeleteWish = async (e) => {
    e.preventDefault()
    try {
      await axios
      navigate('/')
    } catch (error) {
      
    };
  }; */

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (user && user._id === singleWish.created_by) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/wishlist/${wishID}`
        );
        navigate(`/profile/${user._id}`);
      }
    } catch (error) {
      console.log('could not delete wish');
    }
  };

  const handleWantToJoinWish = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${wishID}/join`,
        { userID: user._id }
      );
      navigate(`/profile/${user._id}`);
    } catch (error) {
      console.log('unable to join this wish', error);
    }
  };

  return (
    <>
      <div className='logo-and-search'>
        <div className='logo-div'>
          <Link to='/'>
            <img
              src='/oxito.png'
              alt='oxitoficina-logo'
            />
          </Link>
          <div className='menu-on-profile'>
          <Link to={`/about-oxitoficina`}>
            <h3>About OXITOFICINA</h3>
          </Link>
          <Link to={`/workshops`}>
            <h3>Our Workshops</h3>
          </Link>
          <Link to={`/wishlist`}>
            <h3>Wishlist</h3>
          </Link>
          <Link to={`/teachers`}>
            <h3>Our Teachers</h3>
          </Link>
          <Link to={`/suggestion-box`}>
            <h3>Suggestion Box</h3>
          </Link>
        </div>
        </div>
      </div>
      {singleWish && (
        <div key={singleWish._id}>
          <h3>{singleWish && singleWish.title}</h3>
          <h4>{singleWish && singleWish.description}</h4>
          <h5>{singleWish && singleWish.category}</h5>
          <h5>{singleWish && singleWish.subcategory}</h5>
          <h5>{singleWish && singleWish.remote}</h5>
          <h5>{singleWish && singleWish.age_of_wisher}</h5>
          {singleWish.interested_users.length > 0 && (
            <h6>
              number of interested users {singleWish.interested_users.length}
            </h6>
          )}
        </div>
      )}
      <Link to='/new-proposal'>I can teach you!</Link>

      {/* this following logic will break if there are no authenticated users */}

      {/*    {singleWish && user._id !== singleWish.created_by && (
        <button type='button' onClick={handleWantToJoinWish}>
          I also want to learn about this!
        </button>
      )} */}

      {user ? (
        user._id !== singleWish?.created_by && (
          <button
            type='button'
            onClick={handleWantToJoinWish}>
            I also want to learn about this!
          </button>
        )
      ) : (
        <p>
          <Link to='/login'>Log in</Link> to join this wish.
        </p>
      )}

      {/*  {singleWish && user._id === singleWish.created_by && (
        <button type='button' onClick={handleDelete}>
          Delete this wish?
        </button>
      ) } */}

      {user && user._id === singleWish?.created_by && (
        <button
          type='button'
          onClick={handleDelete}>
          Delete your Wish
        </button>
      )}

      {/*   {singleWish && user._id === singleWish.created_by && (
        <button type='button' onClick={handleDelete}>
          Do you need to edit this wish?
        </button>
      ) } */}
      {/* {user.userWishWaitingList.includes(singleWish._id && (<p>You have already shown interest in joining this workshop!</p> ))}
       */}
      {/*  {user._id === singleWish.created_by && (
        <button
          type='button'
          onClick={handleDelete}>
          Delete your Wish
        </button>
      )}  */}
    </>
  );
};

export default WishDetail;
