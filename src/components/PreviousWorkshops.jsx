import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PreviousWorkshops() {
  const [allWorkshops, setAllWorkshops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);

  const getAllWorkshops = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/workshops`
      );
      const today = new Date();
      const sortedWorkshops = response.data
        .filter((workshop) => new Date(workshop.date) < today) // Filter past workshops
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
      setAllWorkshops(sortedWorkshops);
      setFilteredWorkshops(sortedWorkshops);
    } catch (error) {
      console.error('Error fetching workshops:', error);
    }
  };

  useEffect(() => {
    getAllWorkshops();
  }, []);

  useEffect(() => {
    const filterWorkshops = () => {
      if (!searchQuery.trim()) {
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
        setFilteredWorkshops(filtered);
      }
    };

    filterWorkshops();
  }, [searchQuery, allWorkshops]);

  return (
    <>
      <h2>Our previous Workshops!</h2>
      <Link to='/workshops' ><h4>--back to Workshops-</h4></Link>
      <div>
        {filteredWorkshops.length > 0 ? (
          filteredWorkshops.map((workshop) => (
            <div key={workshop._id}>
              <Link to={`/workshops/${workshop._id}`}>
                <h3>{workshop.title}</h3>
                <h5>{workshop.description}</h5>
                <h6>
                  lectured by {workshop.teachers.map((t) => t.name).join(', ')}
                </h6>
              </Link>
            </div>
          ))
        ) : (
          <p>No workshops found</p>
        )}
      </div>
    </>
  );
}

export default PreviousWorkshops;
