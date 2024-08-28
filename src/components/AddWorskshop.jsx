import { useEffect, useState } from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';

function AddWorkshop() {
  const [title, setTitle] = useState('');
  //const [errorMessage, setErrorMessage] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [remote, setRemote] = useState(false);
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [minimum_age, setMinimum_age] = useState(null);
  const [maximum_age, setMaximum_age] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(null);
  const [minParticipants, setMinParticipants] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/teachers`
      );
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };
  const addTeacher = () => {
    if (selectedTeacher && !selectedTeachers.includes(selectedTeacher)) {
      setSelectedTeachers([...selectedTeachers, selectedTeacher]);
    }
  };
  const removeTeacher = (teacherId) => {
    setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId));
  };

  /* const handleTeachersChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedTeachers(selectedOptions);
  };
 */
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleImage = async (e) => {
    const uploadData = new FormData();
    uploadData.append('imgUrl', e.target.files[0]);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        uploadData
      );
      console.log(response.data.fileUrl);
      setLoading(false);
      setImage(response.data.fileUrl);
    } catch (error) {
      console.log(loading);
      console.error(error);
    }
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const handleCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleSubcategory = (e) => {
    setSubcategory(e.target.value);
  };
  const handleRemote = () => {
    console.log(remote);
  };
  const handlePlace = (e) => {
    setPlace(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleMinimum_age = (e) => {
    setMinimum_age(e.target.value);
  };
  const handleMaximum_age = (e) => {
    setMaximum_age(e.target.value);
  };
  const handleMaxParticipants = (e) => {
    setMaxParticipants(e.target.value);
  };
  const handleMinParticipants = (e) => {
    setMinParticipants(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newWorkshop = {
        title,
        description,
        image,
        duration,
        price,
        category,
        subcategory,
        remote,
        place,
        date,
        teachers: selectedTeachers,
        minimum_age,
        maximum_age,
        maxParticipants,
        minParticipants,
      };
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/workshops`,
        newWorkshop
      );
      setTitle('');
      setDescription('');
      setImage('');
      setDuration('');
      setPrice(null);
      setCategory('');
      setSubcategory('');
      setRemote(false);
      setPlace('');
      setDate(null);
      setTeachers([]);
      setMinimum_age(null);
      setMaximum_age(null);
      setMinParticipants(1);
      setMaxParticipants(null);
      // setErrorMessage('')
    } catch (error) {
      //setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-20 p-4">
      <h2 className="text-xl sm:text-l font-bold pt-12 mb-4 text-center md:max-w-lg">
        Create a Workshop
      </h2>
      <form
        className="w-full max-w-md p-6"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="title"
          className="block text-xs font-medium"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter the title"
        />
        
        <label
          htmlFor="description"
          className="block text-xs font-medium mt-4"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={handleDescription}
          className="block w-full h-auto mt-1 text-xs bg-[rgba(221,220,255,0.997)] py-10 px-4 focus:outline-none text-justify"
          placeholder="Here you can tell us all the most important details, like the best location for you or what languages you are comfortable with."
        />
        
        <label
          htmlFor="image"
          className="block text-xs font-medium mt-4"
        >
          Upload an image
        </label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleImage}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
        />
        
        <label
          htmlFor="duration"
          className="block text-xs font-medium mt-4"
        >
          Duration - hours, days, weeks...?
        </label>
        <input
          type="text"
          name="duration"
          id="duration"
          value={duration}
          onChange={handleDuration}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter duration"
        />
        
        <label
          htmlFor="price"
          className="block text-xs font-medium mt-4"
        >
          An estimated price, in Euros, to charge per participant
        </label>
        <input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={handlePrice}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter price"
        />
        
        <label
          htmlFor="category"
          className="block text-xs font-medium mt-4"
        >
          Select a category
        </label>
        <input
          type="text"
          name="category"
          id="category"
          value={category}
          onChange={handleCategory}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter category"
        />
        
        <label
          htmlFor="subcategory"
          className="block text-xs font-medium mt-4"
        >
          Type a subcategory
        </label>
        <input
          type="text"
          name="subcategory"
          id="subcategory"
          value={subcategory}
          onChange={handleSubcategory}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter subcategory"
        />
        
        <label
          htmlFor="date"
          className="block text-xs font-medium mt-4"
        >
          Input a date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleDate}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
        />
        
        <label
          htmlFor="teacher"
          className="block text-xs font-medium mt-4"
        >
          Select a Teacher
        </label>
        <div className="flex items-center">
          <select
            name="teacher"
            id="teacher"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          >
            <option value="">Select a Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={addTeacher}
            className="ml-2 py-2 px-4 bg-red-500 text-white hover:bg-blue-600 focus:outline-none"
          >
            Add
          </button>
        </div>
  
        <div className="mt-4">
          <h4 className="text-xs font-medium">Selected Teachers:</h4>
          <ul className="list-disc pl-5 mt-2">
            {selectedTeachers.map((teacherId) => {
              const teacher = teachers.find((t) => t._id === teacherId);
              return (
                <li key={teacherId} className="text-xs flex justify-between items-center">
                  {teacher?.name}
                  <button
                    type="button"
                    onClick={() => removeTeacher(teacherId)}
                    className="ml-2 py-1 px-2 bg-red-500 text-white hover:bg-blue-600 focus:outline-none"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
  
        <label
          htmlFor="remote"
          className="block text-xs font-medium mt-4"
        >
          Remote?
        </label>
        <input
          name="remote"
          type="checkbox"
          checked={!remote}
          onChange={(e) => (setRemote(!e.target.checked), handleRemote())}
          className="mr-2 mt-1"
        />
        
        <label
          htmlFor="place"
          className="block text-xs font-medium mt-4"
        >
          Place
        </label>
        <input
          type="text"
          name="place"
          id="place"
          value={place}
          onChange={handlePlace}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter place"
        />
        
        <label
          htmlFor="minimum_age"
          className="block text-xs font-medium mt-4"
        >
          Minimum age of participants
        </label>
        <input
          type="number"
          name="minimum_age"
          id="minimum_age"
          value={minimum_age}
          onChange={handleMinimum_age}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter minimum age"
        />
        
        <label
          htmlFor="maximum_age"
          className="block text-xs font-medium mt-4"
        >
          Maximum age of participants
        </label>
        <input
          type="number"
          name="maximum_age"
          id="maximum_age"
          value={maximum_age}
          onChange={handleMaximum_age}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter maximum age"
        />
        
        <label
          htmlFor="minParticipants"
          className="block text-xs font-medium mt-4"
        >
          Minimum number of participants
        </label>
        <input
          type="number"
          name="minParticipants"
          id="minParticipants"
          value={minParticipants}
          onChange={handleMinParticipants}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter minimum number of participants"
        />
        
        <label
          htmlFor="maxParticipants"
          className="block text-xs font-medium mt-4"
        >
          Maximum number of participants
        </label>
        <input
          type="number"
          name="maxParticipants"
          id="maxParticipants"
          value={maxParticipants}
          onChange={handleMaxParticipants}
          className="block w-full mt-1 bg-[rgba(221,220,255,0.997)] py-2 px-3 focus:outline-none"
          placeholder="Enter maximum number of participants"
        />
        
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 mt-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create
        </button>
      </form>
    </div>
  );
  
}

export default AddWorkshop;
