import React from 'react';
import { Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage/MainPage';
import ChangeUser from './pages/ChangeUser/ChangeUser';

function App() {
  return (
    <Routes>
      <Route path="" element={<MainPage/>}/>
      <Route path="/change-user/:id" element={<ChangeUser/>}/>
      <Route path="/add-user" element={<ChangeUser/>}/>
    </Routes>
  );
}

export default App;
