import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function SuggestionBox() {
  const [allSuggestions, setAllSuggestions] = useState([]);

  const getAllSuggestions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/suggestions`
      );
      setAllSuggestions(response.data);
      console.log(allSuggestions);
    } catch (error) {
      console.log('error fetching all suggestions', error);
    }
  };

  useEffect(() => {
    getAllSuggestions();
  }, [allSuggestions]);

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
          <Link to={`/suggestion-box`}>
            <h3>Suggestion Box</h3>
          </Link>
        </div>
      </div>
      <div>
        <h1>SUGGESTION BOX</h1>
        <div className='all-suggestions'>
          {allSuggestions &&
            allSuggestions.map((suggestion) => {
              return (
                <div
                  className='suggestion-box'
                  key={suggestion._id}>
                  <h6>A person {suggestion.age} years old says:</h6>
                  <h5>{suggestion.comment}</h5>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SuggestionBox;
