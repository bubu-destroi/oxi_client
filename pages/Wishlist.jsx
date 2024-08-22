import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist() {
  const [allWishes, setAllWishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWishes, setFilteredWishes] = useState([]);

  const getAllWishes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/wishlist`
      );
      setAllWishes(response.data);
      setFilteredWishes(response.data);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getAllWishes();
  }, []);

  useEffect(() => {
    if (!searchQuery /* .trim() === '' */) {
      setFilteredWishes(allWishes);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = allWishes.filter(
        (wish) =>
          (wish.title && wish.title.toLowerCase().includes(lowerCaseQuery)) ||
          (wish.description &&
            wish.description.toLowerCase().includes(lowerCaseQuery)) ||
          (wish.category &&
            wish.category.toLowerCase().includes(lowerCaseQuery)) ||
          (wish.subcategory &&
            wish.subcategory.toLowerCase().includes(lowerCaseQuery))
      );
      console.log(searchQuery);
      console.log(filtered);
      setFilteredWishes(filtered);
    }
  }, [searchQuery, allWishes]);

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
      <h1>WISHLIST</h1>
      <h3 className='about-wishes'>
        These are the subjects our users want to learn about. If you are
        interested in preparing a workshop in response to one of these requests,
        click the button -I Can Teach You!- and fill the form
      </h3>
      <div>
        <Link to='/create-wish'>
          <h6>click here to ask for a workshop</h6>
        </Link>
      </div>
      <div>
        {/* <input
        className='search-input'
          id='search-query'
          type='text'
          placeholder='search for any word...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        {filteredWishes.length > 0
          ? filteredWishes.map((wish) => (
              <div
                className='wishes-div'
                key={wish._id}>
                <Link to={`/wishlist/${wish._id}`}>
                  <h2>{wish.title}</h2>
                  <h5>{wish.description}</h5>
                  <h6>age of the wisher {wish.age_of_wisher}</h6>
                  {wish.interested_users.length > 0 && (
                    <h6>
                      number of interested users {wish.interested_users.length}
                    </h6>
                  )}
                </Link>
              </div>
            ))
          : filteredWishes.length === 0 && (
              <p>
                No wishes found, but you can still send a proposal for the
                workshop you have in mind
              </p>
            )}
      </div>
    </>
  );
}

export default Wishlist;
