import { useState,  useEffect } from 'react';
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
    <div className='container mx-auto p-4 pt-20 md:pt-20 md:px-28 lg:px-36'>
      <h2 className='text-base pt-12 md:text-lg text-center font-semibold mb-4'>
        User Management
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* New Users Section */}
        <div className='p-2'>
          <h3 className='text-sm md:text-md text-red-500 font-medium text-center mb-2'>
            New Users {newUsers.length > 0 && newUsers.length}
          </h3>
          {newUsers.length > 0 ? (
            newUsers.map((user) => (
              <div
                className='hover:bg-white p-3 mb-3 shadow-sm max-w-sm mx-auto'
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
                <div className='mb-2'>
                  <img
                    src={user.id_card_picture}
                    alt={`${user.parent_name}'s ID`}
                    className='w-full max-w-xs h-auto shadow-sm'
                  />
                </div>
                <div className='flex justify-center'>
                  <button
                    className='bg-red-500 text-white py-1 px-3 text-xs md:text-xs hover:bg-blue-600 '
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

        {/* Approved Users Section */}
        <div className='p-2'>
          <h3 className='text-sm md:text-md text-red-500 font-medium text-center mb-2'>
            Approved Users {approvedUsers.length > 0 && approvedUsers.length}
          </h3>
          {approvedUsers.length > 0 ? (
            approvedUsers.map((user) => (
              <div
                className='hover:bg-white p-3 mb-3 shadow-sm max-w-sm mx-auto'
                key={user._id}>
                <h5 className='text-xs md:text-xs mb-1'>
                  Learner Username:{' '}
                  <span className='text-red-500'>{user.learner_username}</span>
                </h5>
                <h5 className='text-xs md:text-xs mb-1'>
                  Age: <span className='text-red-500'>{user.age}</span>
                </h5>
                <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                  {' '}
                  Wishes:{' '}
                  {user.wishes.map((wish, index) => (
                    <span key={wish._id}>
                      <Link
                        to={`/wishes/${wish._id}`}
                        className='text-blue-500 hover:underline'>
                        {wish.title}
                      </Link>
                      {index < user.wishes.length - 1 && ', '}
                    </span>
                  ))}
                </h5>
                <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                  Signed Up Workshops:{' '}
                  {user.signedUp_workshops.map((workshop, index) => (
                    <span key={workshop._id}>
                      <Link
                        to={`/workshops/${workshop._id}`}
                        className='text-blue-500 hover:underline'>
                        {workshop.title}
                      </Link>
                      {index < user.signedUp_workshops.length - 1 && ', '}
                    </span>
                  ))}{' '}
                </h5>
                <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                  Waiting List:{' '}
                  {user.userWaitingList.map((workshop, index) => (
                    <span key={workshop._id}>
                      <Link
                        to={`/workshops/${workshop._id}`}
                        className='text-blue-500 hover:underline'>
                        {workshop.title}
                      </Link>
                      {index < user.userWaitingList.length - 1 && ', '}
                    </span>
                  ))}{' '}
                </h5>
                <h5 className='text-xs md:text-xs text-gray-600 mb-1'>
                  Courses Taken:{' '}
                  {user.courses_taken.map((course, index) => (
                    <span key={course._id}>
                      <Link
                        to={`/courses/${course._id}`}
                        className='text-blue-500 hover:underline'>
                        {course.title}
                      </Link>
                      {index < user.courses_taken.length - 1 && ', '}
                    </span>
                  ))}{' '}
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

      <h3 className='text-sm text-center pt-10 pb-5 md:text-lg font-medium text-red-500 md:text-center mb-2'>
        The proposals submitted, yet to be approved
      </h3>
      {proposals.length > 0 && (
        <div className=' grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {proposals.map((proposal) => (
            <div
              className=' hover:bg-white p-3 shadow-sm  w-full mx-auto '
              key={proposal._id}>
              <Link to={`/proposals/${proposal._id}`}>
                <h5 className='text-xs md:text-xs font-medium text-gray-800 mb-1 hover:text-red-500'>
                  {proposal.title}
                </h5>
              </Link>
              <div className='flex justify-center'>
                <button
                  className='bg-red-500 text-white py-1 px-3 text-xs md:text-xs hover:bg-blue-600 '
                  type='button'
                  onClick={() => handleDeleteProposal(proposal._id)}>
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserManagement;
