import axios from 'axios';
import { Link, useParams , useNavigate} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useState, useContext, useEffect } from 'react';

const WishDetail = () => {
  const { user } = useContext(AuthContext);

  const [singleWish, setSingleWish] = useState(null);

  const { wishID } = useParams();
  const navigate = useNavigate();

  const getSingleWish = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${id}`
      );
      setSingleWish(response.data);
      console.log(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleWish(wishID);
  }, [wishID]);

  const handleWantToJoinWish = async (e) => {
    e.preventDefault();
    try {
      

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/wishlist/${wishID}/join`,
        {userID :  user._id }
      );
      navigate(`/profile/${user._id}`)
    } catch (error) {
      console.log('handle join wish error', error);
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
      {singleWish && (
        <div key={singleWish._id}>
          <h3>{singleWish && singleWish.title}</h3>
          <h4>{singleWish && singleWish.description}</h4>
          <h5>{singleWish && singleWish.category}</h5>
          <h5>{singleWish && singleWish.subcategory}</h5>
          <h5>{singleWish && singleWish.remote}</h5>
          <h5>{singleWish && singleWish.age_of_wisher}</h5>
        </div>
      )}
      <Link to='/new-proposal'>I can to teach this!</Link>
      <button type='button' onClick={handleWantToJoinWish}>
        I also want to learn about this!
      </button>
    </>
  );
};

export default WishDetail;
