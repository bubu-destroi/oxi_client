//import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Homepage from '../pages/Homepage';
import AddTeacher from '../components/AddTeacher';
import EditTeacher from '../components/EditTeacher';
//import Private from '../components/Private';
import Teachers from '../pages/Teachers';
import TeacherDetail from '../components/TeacherDetail';
import SignUp from '../pages/Auth/SignUp';
import Login from '../pages/Auth/Login';
import Anon from '../components/Anon';
import { AuthProviderWrapper } from '../context/auth.context';
import Admin from '../components/Admin';
import ProfilePage from '../pages/Auth/ProfilePage';
import Private from '../components/Private';
import Workshops from '../pages/Workshops';

function App() {
  return (
    <>
      <AuthProviderWrapper>
        <Routes>
          <Route
            path='/workshops'
            element={
              <Anon>
                <Workshops />
              </Anon>
            }
          />

          <Route
            path='/profile/:userID'
            element={
              <Private>
                <ProfilePage />
              </Private>
            }
          />

          <Route
            path='/signup'
            element={
              <Anon>
                <SignUp />
              </Anon>
            }
          />

          <Route
            path='/login'
            element={
              <Anon>
                <Login />
              </Anon>
            }
          />

          <Route
            //falta adicionar o context para fazer pesquisa
            path='/teachers'
            element={<Teachers />}
          />
          <Route
            path='/teachers/new'
            element={
              <Admin>
                <AddTeacher />
              </Admin>
            }
          />
          <Route
            path='/teachers/:teacherID'
            element={<TeacherDetail />}
          />
          <Route
            //nesta rota edita e apaga perfil
            path='/teachers/:teacherID/edit'
            element={
              <Admin>
                <EditTeacher />
              </Admin>
            }
          />
        </Routes>
      </AuthProviderWrapper>
    </>
  );
}

export default App;
