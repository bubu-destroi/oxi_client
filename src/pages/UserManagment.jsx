import { useState, useEffect } from 'react';
//import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserManagement() {
  const [allUsers, setAllUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  const [proposals, setProposals] = useState([]);

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

  const handleDeleteProposal = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/proposals/${id}`);
      fetchProposals();
    } catch (error) {
      console.log('error deleting proposal', error);
    }
  };

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users`
      );
      setAllUsers(response.data);
    } catch (error) {
      console.log('Error fetching all users:', error.response?.data);
    }
  };

  // Handle user approval
  const handleApproveUser = async (id) => {
    try {
      // Update the user's approved status on the server
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        approved: true,
      });

      // Update the user's approved status in the frontend state
      const updatedUsers = allUsers.map((user) => {
        if (user._id === id) {
          return { ...user, approved: true };
        }
        return user;
      });

      setAllUsers(updatedUsers);
    } catch (error) {
      console.log('Error approving user:', error.response?.data);
    }
  };

  // Separate users into new and approved users
  useEffect(() => {
    fetchProposals();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const newUsersList = allUsers.filter((user) => !user.approved);
    const approvedUsersList = allUsers.filter((user) => user.approved);

    setNewUsers(newUsersList);
    setApprovedUsers(approvedUsersList);
  }, [allUsers]);
  return (
    <div className='container mx-auto p-10 pt-20 md:pt-20 md:px-28 lg:px-36'>
      <h2 className='text-base pt-12 md:text-lg text-center font-semibold mb-4'>
        User Management
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-7'>
        {/* New Users Section */}
        <div className='relative p-2 h-96 overflow-hidden'>
          <h3 className='text-sm  md:text-md text-red-500 font-medium text-center mb-2 sticky top-0 z-10 pb-6'>
            New Users: {newUsers.length > 0 && newUsers.length}
          </h3>
          <div className='overflow-y-auto h-full pt-3 '>
            {newUsers.length > 0 ? (
              newUsers.map((user) => (
                <div
                  className='hover:bg-white p-3 mb-3 shadow-sm max-w-sm mx-auto '
                  key={user._id}>
                  <h5 className='text-xs md:text-xs font-medium text-gray-800 mb-1'>
                    Learner Username: {user.learner_username}
                  </h5>
                  <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                    Age: {user.age}
                  </h5>
                  <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                    Parent Name: {user.parent_name}
                  </h5>
                  <div className='flex justify-center mb-2 p-8'>
                    <img
                      src={user.id_card_picture}
                      alt={`${user.parent_name}'s ID`}
                      className='w-full max-w-xs h-auto shadow-sm'
                    />
                  </div>
                  <div className='flex justify-center'>
                    <button
                      className='bg-red-500 text-white py-1 px-3 text-xs md:text-xs hover:bg-blue-600'
                      type='button'
                      onClick={() => handleApproveUser(user._id)}>
                      APPROVE
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-xs md:text-xs text-center'>
                No new users awaiting approval.
              </p>
            )}
          </div>
        </div>

        {/* Approved Users Section */}
        <div className='relative p-2 h-80 overflow-hidden mb-7'>
          <h3 className='text-sm  md:text-md text-red-500 font-medium text-center mb-2 sticky top-0 z-10 pb-6'>
            Approved Users: {approvedUsers.length > 0 && approvedUsers.length}
          </h3>
          <div className='overflow-y-auto h-full mb-7'>
            {approvedUsers.length > 0 ? (
              approvedUsers.map((user) => (
                <div
                  className='hover:bg-white p-3 mb-3 h-auto shadow-sm max-w-sm mx-auto'
                  key={user._id}>
                  <h5 className='text-xs md:text-xs mb-1'>
                    Learner Username:{' '}
                  </h5>
                  <h5 className='text-xs text-end md:text-xs text-red-500'>
                    {user.learner_username}
                  </h5>
                  <h5 className='text-xs md:text-xs '>Age:</h5>
                  <h5 className='text-xs text-end md:text-xs text-red-500'>
                    {user.age}
                  </h5>
                  <h5 className='text-xs md:text-xs t mb-1'>
                    Wishes:{' '}
                    <ul className='text-xs text-end md:text-xs text-red-500'>
                      {user.wishes.map((wish, index) => (
                        <li key={wish._id}>
                          <Link
                            to={`/wishes/${wish._id}`}
                            className='text-blue-500 hover:underline'>
                            {wish.title}
                          </Link>
                          {index < user.wishes.length - 1 && ', '}
                        </li>
                      ))}
                    </ul>
                  </h5>
                  <h5 className='text-xs md:text-xs  mb-1'>
                    Signed Up Workshops:{' '}
                    <ul className='text-xs text-end md:text-xs text-red-500'>
                      {user.signedUp_workshops.map((workshop, index) => (
                        <li key={workshop._id}>
                          <Link
                            to={`/workshops/${workshop._id}`}
                            className='text-blue-500 hover:underline'>
                            {workshop.title}
                          </Link>
                          {index < user.signedUp_workshops.length - 1 && ', '}
                        </li>
                      ))}{' '}
                    </ul>
                  </h5>
                  <h5 className='text-xs md:text-xs  mb-1'>
                    Waiting List:{' '}
                    <ul className='text-xs text-end md:text-xs text-red-500'>
                      {user.userWaitingList.map((workshop, index) => (
                        <li key={workshop._id}>
                          <Link
                            to={`/workshops/${workshop._id}`}
                            className='text-blue-500 hover:underline'>
                            {workshop.title}
                          </Link>
                          {index < user.userWaitingList.length - 1 && ', '}
                        </li>
                      ))}{' '}
                    </ul>
                  </h5>
                  <h5 className='text-xs md:text-xs  mb-1'>
                    Courses Taken:{' '}
                    <ul className='text-xs text-end md:text-xs text-red-500'>
                      {user.courses_taken.map((course, index) => (
                        <li key={course._id}>
                          <Link
                            to={`/courses/${course._id}`}
                            className='text-blue-500 hover:underline'>
                            {course.title}
                          </Link>
                          {index < user.courses_taken.length - 1 && ', '}
                        </li>
                      ))}{' '}
                    </ul>
                  </h5>
                </div>
              ))
            ) : (
              <p className='text-xs md:text-xs text-center'>
                No approved users found.
              </p>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className='text-sm text-center pt-10 pb-5 md:text-lg font-medium text-red-500 md:text-center mb-2'>
          The proposals submitted, yet to be approved: {proposals.length}
        </h3>
        {proposals.length > 0 && (
          <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-80 overflow-y-auto '>
            {proposals.map((proposal) => (
              <div
                className='proposal-detail shadow-white pl-3 pr3 p-6 md:p-6 w-full border border-red-200 hover:bg-white'
                key={proposal._id}>
                <h3 className='text-xs  font-bold mb-2 text-center'>
                  Teachers:
                </h3>
                <h3 className='text-xs  mb-2 text-center'>{proposal.name}</h3>
                <h3 className='text-xs  font-bold mb-2 text-center'>Bio:</h3>
                <h3 className='text-xs  mb-2 text-center'>{proposal.bio}</h3>
                <h3 className='text-xs  font-bold mb-2 text-center'>
                  Social Media:
                </h3>
                <h3 className='text-xs  mb-2 text-center'>
                  {proposal.socialMedia}
                </h3>
                <h3 className='text-xs  font-bold mb-2 text-center'>Email:</h3>
                <h3 className='text-xs  mb-2 text-center'>{proposal.email}</h3>
                <h3 className='text-xs  font-bold mb-2 text-center text-red-500'>
                  {proposal.title}
                </h3>
                <h4 className='text-xs md:text-sm mb-3 text-justify'>
                  {proposal.description}
                </h4>
                <div className='w-full flex justify-center py-4'>
                  <img
                    src={proposal.image}
                    alt='proposal'
                    className='w-32 h-32 object-cover'
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
                  <h5 className='mb-1'>Date: {proposal.date.split('T')[0]}</h5>
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
                <div className='flex justify-center mt-4'>
                  <button
                    className='bg-red-500 text-white py-2 px-4 text-xs md:text-sm hover:bg-blue-600'
                    type='button'
                    onClick={() => handleDeleteProposal(proposal._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
