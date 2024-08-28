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
      <div className='' >
        <h2>Check out our Team</h2>
        <input
          id='teacher-search'
          type='text'
          placeholder='Search for ...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {user && user.admin === true && (
          <button
            type='button'
            onClick={() => navigate('/teachers/new')}>
            Add Teacher
          </button>
        )}
        <div className='all-teachers flex justify-center grid-flow-row-dense grid-cols-3 ...'>
          {filteredTeachers.map((teacher) => {
            return (
              <div
                className='teacher-div p-10 text-justify ' 
                key={teacher._id}>
                <Link to={`/teachers/${teacher._id}`}>
                  <h3>{teacher.name}</h3>
                  <h5>{teacher.bio}</h5>
                </Link>
                <h5>
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
                <h5>{teacher.previous_workshops}</h5>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Teachers;
