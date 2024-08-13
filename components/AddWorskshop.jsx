import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      setImage('')
      setDuration('')
      setPrice(null)
      setCategory('')
      setSubcategory('')
      setRemote(false)
      setPlace('')
      setDate(null)
      setTeachers([])
      setMinimum_age(null)
      setMaximum_age(null)
      setMinParticipants(1)
      setMaxParticipants(null)
      // setErrorMessage('')
    } catch (error) {
      //setErrorMessage(error.errorMessage);
      console.log(error);
    }
  };

  return (
    <>
    <div className='logo-div'>
        <Link to={'/'}>
          <img
            src='../src/assets/oxito.png'
            alt='oxitoficina-logo'
          />
        </Link>
      </div>
      <h3>Create a Workshop</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={handleTitle}
        />
        <br />
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          value={description}
          onChange={handleDescription}
        />
        <br />
        <label htmlFor='image'>Upload an image</label>
        <input
          type='file'
          name='image'
          id='image'
          onChange={handleImage}
        />
        <br />
        <label htmlFor='duration'>Duration - hours, days, weeks...?</label>
        <input
          type='text'
          name='duration'
          id='duration'
          value={duration}
          onChange={handleDuration}
        />
        <br />
        <label htmlFor='price'>an estime price, in Euros, to charge per participant</label>
        <input
          type='number'
          name='price'
          id='price'
          value={price}
          onChange={handlePrice}
        />
        <br />
        <label htmlFor='category'>Select a category</label>
        <input
          type='text'
          name='category'
          id='category'
          value={category}
          onChange={handleCategory}
        />
        <br />
        <label htmlFor='subcategory'>Type a subcategory</label>
        <input
          type='text'
          name='subcategory'
          id='subcategory'
          value={subcategory}
          onChange={handleSubcategory}
        />
        <br />
        <label htmlFor='date'>Input a date</label>
        <input
          type='date'
          name='date'
          id='date'
          value={date}
          onChange={handleDate}
        />
        <br />
        {/*  <label htmlFor='teachers'>Input Teachers</label>
        <select
          name='teachers'
          id='teachers'
          multiple
          value={selectedTeachers}
          onChange={handleTeachersChange}>
          {teachers.map((teacher) => (
            <option
              key={teacher._id}
              value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select> */}
        <label htmlFor='teacher'>Select a Teacher</label>
        <select
          name='teacher'
          id='teacher'
          value={selectedTeacher}
          onChange={handleTeacherChange}>
          <option value=''>Select a Teacher</option>
          {teachers.map((teacher) => (
            <option
              key={teacher._id}
              value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <button
          type='button'
          onClick={addTeacher}>
          Add another Teacher
        </button>

        <div>
          <h4>Selected Teachers:</h4>
          <ul>
            {selectedTeachers.map((teacherId) => {
              const teacher = teachers.find((t) => t._id === teacherId);
              return (
                <li key={teacherId}>
                  {teacher?.name}
                  <button
                    type='button'
                    onClick={() => removeTeacher(teacherId)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <br />
        <label htmlFor='remote'>Remote?</label>
        <input
          name='remote'
          type='checkbox'
          checked={!remote} 
          onChange={(e) => (setRemote(!e.target.checked),handleRemote())} 
        />

        <br />
        <label htmlFor='place'>Place</label>
        <input
          type='text'
          name='place'
          id='place'
          value={place}
          onChange={handlePlace}
        />
        <br />
        <label htmlFor='minimum_age'>Mininmum age of participants</label>
        <input
          type='number'
          name='minimum_age'
          id='minimum_age'
          value={minimum_age}
          onChange={handleMinimum_age}
        />
        <br />
        <label htmlFor='maximum_age'>Maximum age of participants</label>
        <input
          type='number'
          name='maximum_age'
          id='maximum_age'
          value={maximum_age}
          onChange={handleMaximum_age}
        />
        <br />
        <label htmlFor='minParticipants'>Minimum number of participants</label>
        <input
          type='number'
          name='minParticipants'
          id='minParticipants'
          value={minParticipants}
          onChange={handleMinParticipants}
        />
        <br />
        <label htmlFor='maxParticipants'>Maximum number of participants</label>
        <input
          type='number'
          name='maxParticipants'
          id='maxParticipants'
          value={maxParticipants}
          onChange={handleMaxParticipants}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </>
  );
}

export default AddWorkshop;
