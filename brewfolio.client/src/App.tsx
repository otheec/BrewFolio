import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import LoginPage from './pages/LoginPage'
import Beers from './pages/Beers';
import Breweries from './pages/Breweries';
import Home from './pages/Home';
import Statuses from './pages/Statuses';
import Types from './pages/Types';
import Repository from './pages/Repository';
import BreweryPage from './pages/BreweryPage';
import BeerPage from './pages/BeerPage';
import BreweryEditPage from './pages/BreweryEditPage';
import BeerEditPage from './pages/BeerEditPage';

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

        <Route path="/brewery/edit/:breweryId" element={<BreweryEditPage />} />
        <Route path="/beer/edit/:beerId" element={<BeerEditPage />} />

        <Route path="/brewery/add" element={<BreweryEditPage />} />
        <Route path="/beer/add" element={<BeerEditPage />} />
      </Routes>
  </BrowserRouter>
  </div>
  );
};

export default App;
