import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
  const { user, logout, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const { userID } = useParams();
  const [proposals, setProposals] = useState([]);
  /* const [singleProposal, setSingleProposal] = useState(null); */

  const fetchProposals = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/proposals`
      );
      setProposals(response.data);
    } catch (error) {
      console.log('error fetching all proposals', error);
    }
  };

  /* const fetchSingleProposal = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/proposals/${id}`
      );
      setSingleProposal(response.data);
    } catch (error) {
      console.log('error fetching sigle proposal', error);
    }
  }; */

  const handleDeleteProposal = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/proposals/${id}`);
      fetchProposals();
    } catch (error) {
      console.log('error deleting proposal', error);
    }
  };

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
    fetchProposals();

    //ESTA DEPENDENCY PODE DAR PROBLEMAS, EU TIREI AS ANTERIORES PORQUE ESTAVA MOUNTING NONSTOP
  }, []);
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;
  return (
    <>
      <div className='big-container text-center mx-auto pt-20 px-6 sm:px-6 md:px-8 lg:w-4/5 xl:w-3/5 p-4'>
        <h1 className='text-2xl font-bold mb-4 text-center pt-12 pb-12 md:text-3xl'>
          Hello <br />
          {user.learner_username && user.learner_username}!
        </h1>
        <h3 className='font-bold text-red-500 text-left md:text-center'>
          These are the wishes you placed
        </h3>
        <div className='text-right mt-2 mb-4 md:text-center'>
          {user.wishes && user.wishes.length > 0 ? (
            user.wishes.map((wish) => (
              <div key={wish._id}>
                <Link to={`/wishlist/${wish._id}`}>
                  <h5 className='text-xs p-2 hover:text-red-500'>
                    {wish.title}
                  </h5>
                </Link>
              </div>
            ))
          ) : (
            <p>You have no wishes listed.</p>
          )}
        </div>
        <h3 className='font-bold text-red-500 text-left md:text-center'>
          You are signed up for the following workshops
        </h3>
        <div className='text-right mt-2 mb-4 md:text-center'>
          {user.signedUp_workshops && user.signedUp_workshops.length > 0 ? (
            user.signedUp_workshops.map((workshop) => (
              <div key={workshop._id}>
                <Link to={`/workshops/${workshop._id}`}>
                  <h5 className='text-xs p-2 hover:text-red-500'>
                    {workshop.title}
                  </h5>
                </Link>
              </div>
            ))
          ) : (
            <h5 className='text-xs p-2 hover:text-red-500'>
              you are not signed for any workshops
            </h5>
          )}
        </div>
        <h3 className='font-bold text-red-500 text-left md:text-center'>
          You are in the waiting list for the following workhops
        </h3>
        <div className='text-right mt-2 mb-4 md:text-center'>
          {user.userWaitingList && user.userWaitingList.length > 0 ? (
            user.userWaitingList.map((workshop) => (
              <div key={workshop._id}>
                <Link to={`/workshops/${workshop._id}`}>
                  <h5 className='text-xs p-2 hover:text-red-500'>
                    {workshop.title}
                  </h5>
                </Link>
              </div>
            ))
          ) : (
            <h5 className='text-xs p-2 hover:text-red-500'>
              You are not listed for any workshops waiting list.
            </h5>
          )}
        </div>
        <h3 className='font-bold text-red-500 text-left md:text-center'>
          You want to join these wishes
        </h3>
        <div className='text-right mt-2 mb-4 md:text-center'>
          {user.userWishWaitingList && user.userWishWaitingList.length > 0 ? (
            user.userWishWaitingList.map((wish) => (
              <div key={wish._id}>
                <Link to={`/wishlist/${wish._id}`}>
                  <h5 className='text-xs p-2 hover:text-red-500'>
                    {wish.title}
                  </h5>
                </Link>
              </div>
            ))
          ) : (
            <h5 className='text-xs p-2 hover:text-red-500'>
              Go check our wishlist and be surprised!!
            </h5>
          )}
        </div>
        {user && user.admin === true && proposals.length > 0 && (
          <h3 className=' font-bold text-red-500 text-left md:text-center '>
            The proposals submited, yet to be approved
          </h3>
        )}
        <div className='text-center mt-2 mb-4 md:grid grid-cols-4 gap-4 '>
          {user &&
            user.admin === true &&
            proposals.length > 0 &&
            proposals.map((proposal) => (
              <div
                className=' bg-white p-2 m-4'
                key={proposal._id}>
                <Link to={`/proposals/${proposal._id}`}>
                  <h5 className='text-xs p-3 w-full hover:text-red-500'>
                    {proposal.title}
                  </h5>
                </Link>
                <button
                  className='bg-red-500 text-white py-2 px-4 hover:bg-blue-600'
                  type='button'
                  onClick={() => handleDeleteProposal(proposal._id)}>
                  delete
                </button>
              </div>
            ))}
        </div>
        <br />
        <button
          className='bg-red-500 text-white py-2 px-4 hover:bg-blue-600'
          onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
}

export default ProfilePage;
