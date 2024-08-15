import { useEffect, useContext, useState } from 'react';
import { AuthContext } from './../context/auth.context';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
      <div className='logo-div'>
        <Link to={'/'}>
          <img
            src='/oxito.png'
            alt='oxitoficina-logo'
          />
        </Link>
      </div>
      <div className='workshop-container'>
        {singleWorkshop && (
          <div
            className='workshop-info'
            key={singleWorkshop._id}>
            <h3>{singleWorkshop.title && singleWorkshop.title}</h3>
            <h4>{singleWorkshop.description && singleWorkshop.description}</h4>
            <h5>
              Duration: {singleWorkshop.duration && singleWorkshop.duration}
            </h5>
            <h5>{singleWorkshop.price && singleWorkshop.price}€</h5>
            <h5>
              {singleWorkshop.category && singleWorkshop.category} ,{' '}
              {singleWorkshop.subcategory && singleWorkshop.subcategory}{' '}
            </h5>
            <h5>remote: {singleWorkshop.remote ? 'yes' : 'no'}</h5>
            <h5>Location: {singleWorkshop.place && singleWorkshop.place}</h5>
            <h5>Date: {singleWorkshop.date && singleWorkshop.date}</h5>
            <h5>
              Lectured by:{' '}
              {singleWorkshop.teachers &&
                singleWorkshop.teachers.map((t) => t.name).join(', ')}
            </h5>
            <h5>
              minimum age required:
              {singleWorkshop.minimum_age && singleWorkshop.minimum_age}
            </h5>
            <h5>
              maximum age suggested:
              {singleWorkshop.maximum_age && singleWorkshop.maximum_age}
            </h5>
            <h5>
              minimum number of participants:{' '}
              {singleWorkshop.minParticipants && singleWorkshop.minParticipants}
            </h5>
            <h5>
              maximum number of participants:{' '}
              {singleWorkshop.maxParticipants && singleWorkshop.maxParticipants}
            </h5>
            <h5>
              signed up participants:
              {singleWorkshop.signedupUsers &&
                singleWorkshop.signedupUsers.length}
            </h5>
            <h5>
              waiting list:{' '}
              {singleWorkshop.waitingList && singleWorkshop.waitingList.length}
            </h5>
            <button
              type='button'
              onClick={handleSignUp}>
              I want to join this workshop!
            </button>
          </div>
        )}
        <div className='workshop-image'>
          {singleWorkshop && (
            <img
              src={singleWorkshop.image}
              alt='workshop-image'
              height={'400px'}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default WorkshopDetail;
