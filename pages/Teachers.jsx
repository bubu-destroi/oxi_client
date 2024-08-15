import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function Teachers() {
  const { logout } = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);

  const getAllTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`
      );
      setTeachers(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllTeachers();
  }, []);

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
      <button
        type='submit'
        onClick={logout}>
        logout
      </button>
      <h2>Check out our Teachers!</h2>
      <div>
        {teachers.map((teacher) => {
          return (
            <div key={teacher._id}>
              <Link to={`/teachers/${teacher._id}`}>
                <h3>{teacher.name}</h3>
                <h5>{teacher.bio}</h5>
                <h5>{teacher.socialMedia}</h5>
                <h5>{teacher.previous_workshops}</h5>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Teachers;
