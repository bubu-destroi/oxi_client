import { Link, useNavigate } from 'react-router-dom';
import {  useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';

function Workshops() {
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  const {user} = useContext(AuthContext)
 const navigate = useNavigate()

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
      <h2>Check out our Workshops</h2>
      <input
            className='search-input'
            id='search-query'
            type='text'
            placeholder='search for any word...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      {user && user.admin === true && (
        <button
          type='button'
          onClick={() => navigate('/create-workshop')}>
          Create New Workshop
        </button>
      )}
      <Link to='/previous-workshops'>
        <h4>-See previous Workhops-</h4>
      </Link>
      <Link to='/new-proposal'>
        <h4>Send us your workshop idea</h4>
      </Link>
      
      <div>
        {filteredWorkshops.length > 0
          ? filteredWorkshops.map((workshop) => (
              <div key={workshop._id}>
                <Link to={`/workshops/${workshop._id}`}>
                  <h3>{workshop.title}</h3>
                  <h5>{workshop.description}</h5>
                  <h6>
                    lectured by{' '}
                    {workshop.teachers.map((t) => t.name).join(', ')}
                  </h6>
                </Link>
              </div>
            ))
          : filteredWorkshops.length === 0 && <p>No workshops found</p>}
      </div>
    </>
  );
}

export default Workshops;
