import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function ProposalDetail() {
  const [proposal, setProposal] = useState(null);
  const { proposalID } = useParams();
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const getProposal = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/proposals/${id}`);
      setProposal(response.data);
    } catch (error) {
      console.error('Error fetching proposal data:', error);
    }
  };

  useEffect(() => {
    getProposal(proposalID);
  }, [proposalID]);

  return (
    <div className='flex flex-col items-center justify-center pt-20 p-3 md:p-6 min-h-screen place-items-center'>
      {proposal && (
        <div className='proposal-detail shadow-sm p-4 md:p-5 w-full md:w-2/3 lg:w-1/2' key={proposal._id}>
          
          <h3 className='text-md font-bold mb-2 text-center pt-10 '>
          Teachers:</h3>
          <h3 className='text-md  mb-2 text-center pb-5 0'>
            {proposal.name}
          </h3>
          <h3 className='text-md font-bold mb-2 text-center '>
          Bio:</h3>
          <h3 className='text-md  mb-2 text-center pb-5 0'>
            {proposal.bio}
          </h3>
          <h3 className='text-md font-bold mb-2 text-center '>
          Social Media:</h3>
          <h3 className='text-md  mb-2 text-center pb-5 0'>
            {proposal.socialMedia}
          </h3>
          <h3 className='text-md font-bold mb-2 text-center '>
          Email:</h3>
          <h3 className='text-md  mb-2 text-center pb-5 0'>
            {proposal.email}
          </h3>
          <h3 className='text-md font-bold mb-2 text-center pb-5  text-red-500'>
            {proposal.title}
          </h3>
          <h4 className='text-xs md:text-sm mb-3 text-justify'>
            {proposal.description}
          </h4>

          <div className='sm:w-full object-cover py-10 md:w-64 float-end md:py-0'>
            <img
              src={proposal.image}
              alt='proposal'
              className='w-full h-auto'
            />
          </div>
          <div className='text-xs mb-2 mt-4 md:mt-6'>
            <h5 className='mb-1'>Duration: {proposal.duration}</h5>
            <h5 className='mb-1'>{proposal.price}€</h5>
            <h5 className='mb-1'>
              {proposal.category}, {proposal.subcategory}
            </h5>
            <h5 className='mb-1'>
              Remote: {proposal.remote ? 'Yes' : 'No'}
            </h5>
            <h5 className='mb-1'>Location: {proposal.place}</h5>
            <h5 className='mb-1'>
              Date: {proposal.date.split('T')[0]}
            </h5>
            <h5 className='mb-1'>
              Minimum age required: {proposal.minimum_age}
            </h5>
            <h5 className='mb-1'>
              Maximum age suggested: {proposal.maximum_age}
            </h5>
            <h5 className='mb-1'>
              Minimum number of participants: {proposal.minParticipants}
            </h5>
            <h5 className='mb-1'>
              Maximum number of participants: {proposal.maxParticipants}
            </h5>
          
          </div>

        {/*   <div className='flex justify-center'>
   
            {user && user.admin === true && proposal && (
              <Link to={`/proposals/${proposal._id}/edit`}>
                <button type='button' className='bg-red-500 text-white mt-4 py-2 px-4 hover:bg-blue-600'>
                  Edit
                </button>
              </Link>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}

export default ProposalDetail;
