import { Link, useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function TeacherDetail() {
  const { user } = useContext(AuthContext);

  const [teacher, setTeacher] = useState(null);
  //const navigate = useNavigate();
  const { teacherID } = useParams();

  const getSingleTeacher = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers/${id}`
      );
      setTeacher(response.data);
      console.log(response.data);
      // console.log(teacher);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleTeacher(teacherID);
  }, [teacherID]);

  return (
    <>
      <div className='logo-and-search'>
        <div className='logo-div'>
          <Link to={'/'}>
            <img
              src='/oxito.png'
              alt='oxitoficina-logo'
            />
          </Link>
        </div>
        <div className='menu-on-profile'>
          <Link to={`/about-oxitoficina`}>
            <h3>About OXITOFICINA</h3>
          </Link>
          <Link to={`/workshops`}>
            <h3>Our Workshops</h3>
          </Link>
          <Link to={`/wishlist`}>
            <h3>Wishlist</h3>
          </Link>
          <Link to={`/teachers`}>
            <h3>Our Teachers</h3>
          </Link>
        </div>
      </div>
      <div>a closer look at</div>
      {teacher && (
        <div className='teacher-detail' key={teacher._id}>
          <h3>{teacher.name}</h3>
          <h5>{teacher.bio}</h5>
          <h5><a 
          href={teacher.socialMedia.startsWith('http') ? teacher.socialMedia : `https://${teacher.socialMedia}`} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {teacher.socialMedia}
        </a></h5>
          <ul>
            {teacher.previous_workshops.map((workshop) => (
              <li key={workshop._id}>{workshop.title}</li>
            ))}
          </ul>
        </div>
      )}
      {user?.admin && (
        <Link to={`/teachers/${teacherID}/edit`}>
          <button type='submit'>edit</button>
        </Link>
      )}
    </>
  );
}

export default TeacherDetail;
