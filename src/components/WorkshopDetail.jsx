import { useEffect, useContext, useState } from 'react';
import { AuthContext } from './../context/auth.context';
import {  useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function WorkshopDetail() {
  const { user, updateUser } = useContext(AuthContext);

  const [singleWorkshop, setSingleWorkshop] = useState(null);

  const { workshopID } = useParams();
  const navigate = useNavigate();

  const getSingleWorkshop = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workshops/${id}`
      );
      setSingleWorkshop(response.data);
      console.log('singleWorkshop', singleWorkshop);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleWorkshop(workshopID);
  }, [workshopID]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/workshops/${workshopID}/join`,
          { userID: user._id }
        );
        updateUser(user);
        navigate(`/profile/${user._id}`);
      } catch (error) {
        console.log('error', error);
      }
    } else {
      navigate('/signup');
    }

  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-20 p-3 md:p-6 min-h-screen place-items-center">
        {singleWorkshop && (
          <div
            className="workshop-detail shadow-sm p-4 md:p-5 w-full md:w-2/3 lg:w-1/2"
            key={singleWorkshop._id}
          >
            <h3 className="text-xl font-bold mb-2 text-center pb-5 text-red-500">
              {singleWorkshop.title}
            </h3>
            <h4 className="text-xs md:text-sm mb-3 text-justify">
              {singleWorkshop.description}
            </h4>
  
           
  
               {/* Image positioned between description and other details */}
            <div className=' sm:w-full object-cover  md:w-64 float-end'>
              {singleWorkshop && (
                <img
                  src={singleWorkshop.image}
                  alt="workshop"
                  className=""
                />
              )}
            </div>
            {/* Additional workshop details */}
            <div className="text-xs mb-2 mt-4 md:mt-6">
              <h5 className="mb-1">Duration: {singleWorkshop.duration}</h5>
              <h5 className="mb-1">{singleWorkshop.price}€</h5>
              <h5 className="mb-1">
                {singleWorkshop.category}, {singleWorkshop.subcategory}
              </h5>
              <h5 className="mb-1">Remote: {singleWorkshop.remote ? 'Yes' : 'No'}</h5>
              <h5 className="mb-1">Location: {singleWorkshop.place}</h5>
              <h5 className="mb-1">Date: {singleWorkshop.date.split('T')[0]}</h5>
              <h5 className="mb-1">
                Lectured by:{' '}
                {singleWorkshop.teachers &&
                  singleWorkshop.teachers.map((t) => t.name).join(', ')}
              </h5>
              <h5 className="mb-1">Minimum age required: {singleWorkshop.minimum_age}</h5>
              <h5 className="mb-1">Maximum age suggested: {singleWorkshop.maximum_age}</h5>
              <h5 className="mb-1">
                Minimum number of participants: {singleWorkshop.minParticipants}
              </h5>
              <h5 className="mb-1">
                Maximum number of participants: {singleWorkshop.maxParticipants}
              </h5>
              <h5 className="mb-1">
                Signed up participants:{' '}
                {singleWorkshop.signedupUsers && singleWorkshop.signedupUsers.length}
              </h5>
              <h5 className="mb-3">
                Waiting list:{' '}
                {singleWorkshop.waitingList && singleWorkshop.waitingList.length}
              </h5>
            </div>
  
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSignUp}
                className="bg-red-500 text-white py-2 px-4 hover:bg-blue-600"
              >
                Join this workshop
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
  
  
  
  
}

export default WorkshopDetail;
