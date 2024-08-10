import { useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function TeacherDetail() {

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
      <div>a closer look at</div>
      {teacher && (
        <div key={teacher._id}>
          <h3>{teacher.name}</h3>
          <h5>{teacher.bio}</h5>
          <h5>{teacher.socialMedia}</h5>
          <ul>
            {teacher.previous_workshops.map((workshop) => (
              <li key={workshop._id}>{workshop.title}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default TeacherDetail;
