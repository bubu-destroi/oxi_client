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
      <div className="flex flex-col items-center justify-center pt-20 p-3 md:p-6 min-h-screen place-items-center">
        {singleWish && (
          <div
            className="workshop-detail shadow-sm p-4 md:p-5 w-full md:w-2/3 lg:w-1/2"
            key={singleWish._id}
          >
            <h3 className="text-xl font-bold mb-2 text-center pb-5 text-red-500">
              {singleWish.title}
            </h3>
            <h4 className="text-xs md:text-sm mb-3 text-justify">
              {singleWish.description}
            </h4>
  
            {/* Image positioned between description and other details */}
            <div className='sm:w-full object-cover md:w-64 float-end'>
              {singleWish.image && (
                <img
                  src={singleWish.image}
                  alt="wish"
                  className=""
                />
              )}
            </div>
  
            {/* Additional wish details */}
            <div className="text-xs mb-2 mt-4 md:mt-6">
              <h5 className="mb-1">{singleWish.category}</h5>
              <h5 className="mb-1">{singleWish.subcategory}</h5>
              <h5 className="mb-1">
                Remote: {singleWish.remote ? 'Yes' : 'No'}
              </h5>
              <h5 className="mb-1">Age of the Wisher: {singleWish.age_of_wisher}</h5>
              {singleWish.interested_users.length > 0 && (
                <h6 className="mb-3">
                  Number of Interested Users: {singleWish.interested_users.length}
                </h6>
              )}
            </div>
  
            <div className="flex justify-center p-5">
              <Link to='/new-proposal' className="bg-red-500 text-white py-2 px-4 hover:bg-blue-600 ">
                I can teach you!
              </Link>
            </div>
  
            {user ? (
              user._id !== singleWish?.created_by && (
                <div className="flex justify-center mt-4">
                  <button
                    type="button"
                    onClick={handleWantToJoinWish}
                    className="bg-red-500 text-white py-2 px-4 hover:bg-blue-600"
                  >
                    I also want to learn about this!
                  </button>
                </div>
              )
            ) : (
              <div className="flex justify-center mt-4">
                <p>
                  <Link to='/login' className="text-red-500 underline">Log in</Link> to join this wish.
                </p>
              </div>
            )}
  
            {user && user._id === singleWish?.created_by && (
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 text-white py-2 px-4 hover:bg-blue-600"
                >
                  Delete your Wish
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
  
};

export default WishDetail;
