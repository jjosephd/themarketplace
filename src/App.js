import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import React from 'react';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
