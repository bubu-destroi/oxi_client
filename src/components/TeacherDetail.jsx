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

  const today = new Date();
  const previousWorkshops = teacher?.previous_workshops.filter(workshop => new Date(workshop.date) < today) || [];
  const upcomingWorkshops = teacher?.previous_workshops.filter(workshop => new Date(workshop.date) >= today) || [];


  return (
    <>
       <div className='big-container mx-auto pt-20 px-4 sm:px-6 md:px-8 lg:w-4/5 xl:w-3/5 p-4'>
        <div className='flex flex-col items-center justify-center p-3 md:p-6 min-h-screen place-items-center'>
       <h1 className='text-s md:text-md font-bold text-center pt-10'>a closer look at</h1>
          {teacher && (
            <div
              className='workshop-detail shadow-sm p-4 md:p-5 w-full md:w-2/3 lg:w-1/2'
              key={teacher._id}>
              <h3 className='text-xl font-bold mb-2 text-center pb-5 text-red-500'>
                {teacher.name}
              </h3>
              <h5 className='text-xs md:text-sm mb-3 text-justify'>
                {teacher.bio}
              </h5>
              <h5 className='text-red-500 py-2 px-4 hover:text-blue-600 '>
                <a
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
              {previousWorkshops.length > 0 && (
              <>
                <h5 className='text-sm md:text-md font-bold p-4'>Previous Workshops</h5>
                <ul>
                  {previousWorkshops.map(workshop => (
                    <li key={workshop._id}>
                      <Link className='text-red-500 py-2 px-4 hover:text-blue-600' to={`/workshops/${workshop._id}`}>
                        {workshop.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Conditionally render Upcoming Workshops */}
            {upcomingWorkshops.length > 0 && (
              <>
                <h5 className='text-sm md:text-md font-bold p-4'>Upcoming Workshops</h5>
                <ul>
                  {upcomingWorkshops.map(workshop => (
                    <li key={workshop._id}>
                      <Link className='text-red-500 py-2 px-4 hover:text-blue-600' to={`/workshops/${workshop._id}`}>
                        {workshop.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
          {user?.admin && (
            <Link to={`/teachers/${teacherID}/edit`}>
              <button type='submit'>edit</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default TeacherDetail;
