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
      <div className='big-container mx-auto p-4 pt-20 px-4 sm:px-6 md:px-8 '>
        <h1 className='text-2xl font-bold mb-4 text-center pt-10'>WISHLIST</h1>
        <h5 className='text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs mb-6 text-center about-wishes'>
          These are the subjects our users want to learn about. <br /> If you
          are interested in designing a workshop in response to one of these
          requests, click the button -I Can Teach You!- and submit the form.
        </h5>
        <div className='text-center mb-4'>
          <Link
            to='/create-wish'
            className=''>
            <h3 className='text-sm sm:text-sm md:text-sm lg:text-xs xl:text-xs font-semibold text-red-500'>
              Place your WISH here
            </h3>
          </Link>
        </div>
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
        <div className='flex justify-center mb-6'>
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-fit'>
            {filteredWishes.length > 0
              ? filteredWishes.map((wish) => (
                  <div
                    className='wishes-div p-4 shadow-sm hover:bg-gray-100'
                    key={wish._id}>
                    <Link
                      to={`/wishlist/${wish._id}`}
                      className='text-black'>
                      <h2 className='text-s sm:text-xs md:text-xs font-bold mb-2 text-red-500 text-center'>
                        {wish.title}
                      </h2>
                      <h5 className='text-xs sm:text-xs md:text-xs mb-2 text-justify'>
                        {wish.description}
                      </h5>
                      <h6 className='text-xs sm:text-xs md:text-xs '>
                        Age of the wisher:{' '}
                        <span className='text-red-500'>
                          {wish.age_of_wisher}
                        </span>
                      </h6>
                      {wish.interested_users.length > 0 && (
                        <h6 className='text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs '>
                          Number of interested users:{' '}
                          <span className='text-red-500'>
                            {wish.interested_users.length}
                          </span>
                        </h6>
                      )}
                    </Link>
                  </div>
                ))
              : filteredWishes.length === 0 && (
                  <div className='flex justify-center items-center w-full'>
                    <p className='text-sm sm:text-xs md:text-xs lg:text-xs xl:text-xs text-center'>
                      No wishes found, but you can still send a proposal for the
                      workshop you have in mind.
                    </p>
                  </div>
                )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
