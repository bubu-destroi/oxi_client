import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Workshops() {
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  const getAllWorkshops = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workshops`
      );
      setAllWorkshops(response.data);
      setFilteredWorkshops(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllWorkshops();
  }, []);

  useEffect(() => {
    if (!searchQuery/* .trim() === '' */) {
      setFilteredWorkshops(allWorkshops);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allWorkshops.filter(
        (workshop) =>
          workshop.title.toLowerCase().includes(lowerCaseQuery) ||
          workshop.description.toLowerCase().includes(lowerCaseQuery) ||
          workshop.teacher.toLowerCase().includes(lowerCaseQuery) ||
          workshop.category.toLowerCase().includes(lowerCaseQuery) ||
          workshop.place.toLowerCase().includes(lowerCaseQuery) ||
          workshop.date.includes(searchQuery) ||
          workshop.subcategory.toLowerCase().includes(lowerCaseQuery)
      );
      console.log(searchQuery);
      setFilteredWorkshops(filtered);
    }
  }, [searchQuery, allWorkshops]);

  return (
    <>
      <h2>Check out our Workshops!</h2>
      <div>
        <input
          type='text'
          placeholder='search for any word...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredWorkshops.length > 0
          ? filteredWorkshops.map((workshop) => (
              <div key={workshop._id}>
                <Link to={`/workshops/${workshop._id}`}>
                  <h3>{workshop.title}</h3>
                  <h5>{workshop.description}</h5>
                  <h6>lectured by {workshop.teacher}</h6>
                </Link>
              </div>
            ))
          : (filteredWorkshops.length === 0 && <p>No workshops found</p>)}
      </div>
    </>
  );
}

export default Workshops;
