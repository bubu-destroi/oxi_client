import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Teachers() {
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
      <h2>Check out our Teachers!</h2>
      <div>
        {teachers.map((teacher) => {
          return <div key={teacher._id}>
            <Link to={`/teachers/${teacher._id}`}>
                <h3>{teacher.name}</h3>
                <h5>{teacher.bio}</h5>
                <h5>{teacher.socialMedia}</h5>
                <h5>{teacher.previous_workshops}</h5>
            </Link>
          </div>;
        })}
      </div>
      {}
    </>
  );
}

export default Teachers;
