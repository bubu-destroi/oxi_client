import { Link, useNavigate } from 'react-router-dom';
import { /* useContext,  */ useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
useNavigate;
//import { AuthContext } from '../context/auth.context';

function Teachers() {
  // const { logout } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`
      );
      setTeachers(response.data);
      setFilteredTeachers(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredTeachers(teachers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = teachers.filter(
        (teacher) =>
          (teacher.name &&
            teacher.name.toLowerCase().includes(lowerCaseQuery)) ||
          (teacher.bio && teacher.bio.toLowerCase().includes(lowerCaseQuery)) ||
          (teacher.socialMedia &&
            teacher.socialMedia.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredTeachers(filtered);
    }
  }, [searchQuery, teachers]);

  return (
    <>
      <div className='big-container mx-auto pt-32 px-4 sm:px-6 md:px-8 lg:w-4/5 xl:w-3/5 p-4'>
        <h2 className='text-xl font-bold mb-4 text-center pt-10'>
          Check out our Team
        </h2>
        <div className='mb-6 flex justify-center'>
          <input
            className='search-input flex justify-center px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm md:text-xs lg:text-xs xl:text-xs'
            id='teacher-search'
            type='text'
            placeholder='Search for ...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {user && user.admin === true && (
          <div className='text-center mb-4'>
            <button
              className='bg-red-500 text-white px-4 py-2  hover:bg-red-600'
              type='button'
              onClick={() => navigate('/teachers/new')}>
              Add Teacher
            </button>
          </div>
        )}
        <div className='flex justify-center mb-6'>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-fit '>
            {filteredTeachers.map((teacher) => {
              return (
                <div
                  className='p-4 shadow-sm hover:bg-gray-100 h-fit'
                  key={teacher._id}>
                  <Link to={`/teachers/${teacher._id}`}>
                    <h3 className='text-s sm:text-xs md:text-xs font-bold mb-2 p-4 text-red-500 text-center'>
                      {teacher.name}
                    </h3>
                    <h5 className='text-xs sm:text-xs md:text-xs mb-2 text-justify'>
                      {teacher.bio}
                    </h5>
                  </Link>
                  <h5 className='text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs pt-5'>
                    <a
                      id='social-link'
                      href={
                        teacher.socialMedia.startsWith('http')
                          ? teacher.socialMedia
                          : `https://${teacher.socialMedia}`
                      }
                      target='_blank'
                      rel='noopener noreferrer'>
                      {teacher.socialMedia}
                    </a>
                  </h5>
                  {/*  */}
                  {/* <h5>{teacher.previous_workshops}</h5> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Teachers;
