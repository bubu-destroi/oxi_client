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
      <div className='logo-and-search'>
        <div className='logo-div'>
          <Link to='/'>
            <img
              src='/oxito.png'
              alt='oxitoficina-logo'
            />
          </Link>
        </div>
        <div>
          <input
            className='search-input'
            id='search-query'
            type='text'
            placeholder='search for any word...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
          <Link to={`/suggestion-box`}>
            <h3>Suggestion Box</h3>
          </Link>
        </div>
      </div>
      <h2>Check out our Workshops!</h2>
      <Link to='/previous-workshops'>
        <h4>-See previous Workhops-</h4>
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
