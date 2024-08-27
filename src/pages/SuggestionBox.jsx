import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
//import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function SuggestionBox() {
  const [allSuggestions, setAllSuggestions] = useState([]);

  const { user } = useContext(AuthContext);

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

  const handleDeleteSuggestion = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/suggestions/${id}`
      );
      getAllSuggestions();
    } catch (error) {
      console.log('error deleting suggestion', error);
    }
  };

  useEffect(() => {
    getAllSuggestions();
  }, []);

  return (
    <>
      <div>
        <h1>Voices of Progress</h1>
        <h4>Here you can read about different experiences related to teaching and different school systems</h4>
        <div className='all-suggestions'>
          {allSuggestions &&
            allSuggestions.map((suggestion) => {
              return (
                <div
                  className='suggestion-box'
                  key={suggestion._id}>
                  <h6>A {suggestion.age}-year-old person says:</h6>
                  <h5>{suggestion.comment}</h5>
                  {user && user.admin === true && (
                    <button
                      type='button'
                      onClick={() => handleDeleteSuggestion(suggestion._id)}>
                      delete
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SuggestionBox;
