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
      <div className='big-container mx-auto pt-32 px-4 sm:px-6 md:px-8 lg:w-4/5 xl:w-3/5 p-4'>
        <h1 className='text-2xl font-bold mb-4 text-center pt-10'>
          Voices of Progress
        </h1>
        <h4 className='text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mb-6 text-center about-wishes'>
          Here you can read about different experiences related to teaching and
          different school systems
        </h4>
        <div className='flex justify-center mb-6'>
          <div className='grid gap-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-fit md:grid-flow-row-dense'>
            {allSuggestions &&
              allSuggestions.map((suggestion) => {
                return (
                  <div
                    className= 'p-4 shadow-sm hover:bg-gray-100 min-h-fit max-h-full pl-10 pr-10 pt-10 mt-10'
                    style={{ minHeight: 'auto' }}
                    key={suggestion._id}>
                    <h6 className='text-xs sm:text-xs md:text-xs mb-4 text-justify'>
                      A <span className='text-red-500'>{suggestion.age}</span>
                      -year-old person says:
                    </h6>
                    <h5 className='text-xs sm:text-xs md:text-xs mb-2 text-justify pl-4 pr-4 max-h-80 overflow-y-auto'>
                      {suggestion.comment}
                    </h5>
                    {user && user.admin === true && (
                      <div className="flex justify-center mt-4">
                        <button
                          className='bg-red-500 text-white py-2 px-4 hover:bg-blue-600'
                          type='button'
                          onClick={() =>
                            handleDeleteSuggestion(suggestion._id)
                          }>
                          delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestionBox;
