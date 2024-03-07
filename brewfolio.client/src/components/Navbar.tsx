import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactComponent as BrandBeerIcon } from '../assets/brandbeer.svg';
import { useNavigate } from 'react-router-dom';


const Navbar: React.FC = () => {

  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
    alert("You have been logged out");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <BrandBeerIcon className="me-2" style={{ height: '32px', width: 'auto' }}/>
        <Link className="navbar-brand" to="/">BrewFolio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link" to="/home">Home</Link>
            <Link className="nav-link" to="/breweries">Breweries</Link>
            <Link className="nav-link" to="/beers">Beers</Link>
            <Link className="nav-link" to="/statuses">Statuses</Link>
            <Link className="nav-link" to="/types">Types</Link>
            <Link className="nav-link" to="/repository">Repository</Link>
          </div>
          <div className="navbar-nav ms-auto">
            <div className="nav-link" onClick={handleLogOut}>Log out</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
