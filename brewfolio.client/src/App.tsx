import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage'
import Beers from './pages/Beers';
import Breweries from './pages/Breweries';
import Home from './pages/Home';
import Statuses from './pages/Statuses';
import Types from './pages/Types';
import Repository from './pages/Repository';
import BreweryPage from './pages/BreweryPage';
import BeerPage from './pages/BeerPage';

const App: React.FC = () => {
  return (
  <div>
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/breweries" element={<Breweries/>} />
        <Route path="/beers" element={<Beers/>} />
        <Route path="/statuses" element={<Statuses/>} />
        <Route path="/types" element={<Types/>} />
        <Route path="/repository" element={<Repository/>} />

        <Route path="/brewery/:breweryId" element={<BreweryPage />} />
        <Route path="/beer/:beerId" element={<BeerPage />} />
      </Routes>
  </BrowserRouter>
  </div>
  );
};

export default App;
