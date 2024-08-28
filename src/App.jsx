//import { useState } from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Homepage from '../pages/Homepage';
import EditTeacher from './components/EditTeacher';
//import Private from './components/Private';
import Teachers from './pages/Teachers';
import TeacherDetail from './components/TeacherDetail';
import SignUp from './pages/Auth/SignUp';
import Login from './pages/Auth/Login';
import Anon from './components/Anon';
import Admin from './components/Admin';
import AddTeacher from './components/AddTeacher';

import ProfilePage from './pages/Auth/ProfilePage';
import Private from './components/Private';
import Workshops from './pages/Workshops';
import Wishlist from './pages/Wishlist';
import Homepage from './pages/Homepage';
import AddWorkshop from './components/AddWorskshop';
import AddWish from './components/AddWish';
import WishDetail from './components/WishDetail';
import WorkshopDetail from './components/WorkshopDetail';
import Proposal from './pages/Proposal';
import PreviousWorkshops from './components/PreviousWorkshops';
import About from './pages/About';
import SuggestionBox from './pages/SuggestionBox';
import NavbarRight from './components/NavbarRigth';
import NavbarLeft from './components/NavbarLeft';
import EditWorkshop from './components/EditWorkshop';
import ProposalDetail from './components/ProposalDetail';

function App() {
  return (
    <>
      <Anon>
        <NavbarRight />
      </Anon>
      <Anon>
        <NavbarLeft />
      </Anon>
      <Routes>
        <Route
          path='/'
          element={
            <Anon>
              <Homepage />
            </Anon>
          }
        />
        <Route
          path='/about-oxitoficina'
          element={
            <Anon>
              <About />
            </Anon>
          }
        />
        <Route
          path='/voices-of-progress'
          element={
            <Anon>
              <SuggestionBox />
            </Anon>
          }
        />
        <Route
          path='/wishlist/:wishID'
          element={
            // <Anon>
            <WishDetail />
            // </Anon>
          }
        />
        <Route
          path='/new-proposal'
          element={<Proposal />}
        />
        <Route
          path='/create-wish'
          element={<AddWish />}
        />
        <Route
          path='/create-workshop'
          element={
            <Admin>
              <AddWorkshop />
            </Admin>
          }
        />
        <Route
          path='/workshops'
          element={
            <Anon>
              <Workshops />
            </Anon>
          }
        />
        <Route
          path='/workshops/:workshopID/edit'
          element={
            <Admin>
              <Anon>
                <EditWorkshop />
              </Anon>
            </Admin>
          }
        />
        <Route
          path='/proposals/:proposalID'
          element={
            <Admin>
              <Anon>
                <ProposalDetail />
              </Anon>
            </Admin>
          }
        />
        <Route
          path='/previous-workshops'
          element={
            <Anon>
              <PreviousWorkshops />
            </Anon>
          }
        />
        <Route
          path='/workshops/:workshopID'
          element={
            <Anon>
              <WorkshopDetail />
            </Anon>
          }
        />

        <Route
          path='/wishlist'
          element={<Wishlist />}
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
    </>
  );
}

export default App;
