import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function Workshops() {
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getAllWorkshops = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workshops`
      );
      const today = new Date();
      const sortedWorkshops = response.data
        .filter((workshop) => new Date(workshop.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setAllWorkshops(sortedWorkshops);
      setFilteredWorkshops(sortedWorkshops);
    } catch (error) {
      console.log('error', error);
    }
  };
 
/*   const getPastWorkshops = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workshops`
      );
      const today = new Date();
      const sortedWorkshops = response.data
        .filter((workshop) => new Date(workshop.date) < today) 
        .sort((a, b) => new Date(b.date) - new Date(a.date)); 
      //setAllWorkshops(sortedWorkshops);
      setFilteredWorkshops(sortedWorkshops);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    }
  }; */
  useEffect(() => {
    getAllWorkshops();
  }, []);

  useEffect(() => {
    if (!searchQuery /* .trim() === '' */) {
      setFilteredWorkshops(allWorkshops);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allWorkshops.filter(
        (workshop) =>
          (workshop.title &&
            workshop.title.toLowerCase().includes(lowerCaseQuery)) ||
          (workshop.description &&
            workshop.description.toLowerCase().includes(lowerCaseQuery)) ||
          (workshop.teachers &&
            workshop.teachers.some((teacher) =>
              teacher.name.toLowerCase().includes(lowerCaseQuery)
            )) ||
          (workshop.category &&
            workshop.category.toLowerCase().includes(lowerCaseQuery)) ||
          (workshop.place &&
            workshop.place.toLowerCase().includes(lowerCaseQuery)) ||
          (workshop.date && workshop.date.includes(searchQuery)) ||
          (workshop.subcategory &&
            workshop.subcategory.toLowerCase().includes(lowerCaseQuery))
      );
      console.log(searchQuery);
      console.log(filtered);
      setFilteredWorkshops(filtered);
    }
  }, [searchQuery, allWorkshops]);
  return (
    <>
      <div className='big-container mx-auto pt-20 px-4 sm:px-6 md:px-8 lg:w-4/5 xl:w-3/5 p-4'>
        <h1 className='text-2xl font-bold mb-4 text-center pt-10'>
          Check out our Workshops
        </h1>
        <div className='mb-6 flex justify-center'>
          <input
            className='search-input flex justify-center px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-sm md:text-xs lg:text-xs xl:text-xs'
            id='search-query'
            type='text'
            placeholder='search for any word...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {user && user.admin === true && (
          <div className='text-center mb-4'>
            <button
              type='button'
              onClick={() => navigate('/create-workshop')}
              className='bg-red-500 text-white px-4 py-2  hover:bg-red-600'>
              Create New Workshop
            </button>
          </div>
        )}
        {/* <div className='text-center mb-4'>
            <button
              type='button'
              onClick={getPastWorkshops}
              className='bg-red-500 text-white px-4 py-2  hover:bg-red-600'>
              -See previous workshops-
            </button>
          </div> */}
        <div className='text-center mb-4'>
          <Link to='/previous-workshops' className=''>
            <h4 className='text-sm sm:text-xs md:text-xs  hover:text-red-500'>
              -See previous Workshops-
            </h4>
          </Link>
        </div>
        <div className='text-center mb-4'>
          <Link to='/new-proposal' className=''>
            <h4 className='text-sm sm:text-xs md:text-xs  hover:text-red-500'>
              Send us your workshop idea
            </h4>
          </Link>
        </div>
        <div className='flex justify-center mb-6'>
          <div className='grid gap-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-fit md:grid-flow-row-dense'>
            {filteredWorkshops.length > 0
              ? filteredWorkshops.map((workshop) => (
                  <div
                    className='p-4 shadow-sm hover:bg-gray-100 h-80 overflow-y-auto pl-10 pr-10 pt-10 mt-10'
                    key={workshop._id}>
                    <Link to={`/workshops/${workshop._id}`} className='text-black'>
                      <h3 className='text-s sm:text-xs md:text-xs font-bold mb-2 text-red-500 text-center'>
                        {workshop.title}
                      </h3>
                      <h5 className='text-xs sm:text-xs md:text-xs mb-2 text-justify'>
                        {workshop.description}
                      </h5>
                      <h6 className='text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs pt-5'>
                        lectured by{' '}<span className='text-red-500'>

                        {workshop.teachers.map((t) => t.name).join(', ')}
                        </span>
                      </h6>
                    </Link>
                  </div>
                ))
              : filteredWorkshops.length === 0 && (
                  <p className='text-sm sm:text-xs md:text-xs lg:text-xs xl:text-xs text-center'>
                    No workshops found
                  </p>
                )}
          </div>
        </div>
      </div>
    </>
  );
  
}

export default Workshops;
