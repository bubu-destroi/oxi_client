//import { useState } from 'react'
import './App.css';

//import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
//import Homepage from '../pages/Homepage';
import AddTeacher from '../components/AddTeacher';
import EditTeacher from '../components/EditTeacher';
//import Private from '../components/Private';
//import TeacherDetail from '../components/TeacherDetail';
import Teachers from '../pages/Teachers';
import TeacherDetail from '../components/TeacherDetail';
import SignUp from '../pages/Auth/SignUp';
//import { AuthContext } from '../context/auth.context';

function App() {
  //const { user, loading, logout } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          //falta adicionar o context para fazer pesquisa
          path='/teachers'
          element={<Teachers />}
        />
        <Route
          path='/teachers/new'
          element={<AddTeacher />}
        />
        <Route
          path='/teachers/:teacherID'
          element={<TeacherDetail />}
        />
        <Route
          //nesta rota edita e apaga perfil
          path='/teachers/:teacherID/edit'
          element={
            //<Private>
            <EditTeacher />
            //</Private>
          }
        />
      </Routes>
    </>
  );
}

export default App;
