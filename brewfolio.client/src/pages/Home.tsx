import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return(
        <>
        <Navbar/>
        <div className="container my-4">
        <div className="row align-items-md-stretch">
            <h1 className="display-5 fw-bold p-3 pt-0">Welcome to the BrewFolio!</h1>
            <div className="col-md-6 my-2">
                <div className="h-100 p-5 text-bg-dark rounded-3">
                <h2>Manage Breweries</h2>
                <p>Take control of the brewery scene! Jump into our Breweries Management to add, explore, and update your favorite breweries in a snap on BrewFolio.</p>
                <button className="btn btn-outline-light" type="button">
                    <Link className="nav-link" to="/breweries">Manage Breweries</Link>
                </button>
                </div>
            </div>
            <div className="col-md-6 my-2">
                <div className="h-100 p-5 bg-body-secondary border rounded-3">
                <h2>Manage Beers</h2>
                <p>Craft your beer journey! Navigate to our Beers Management to curate, discover, and manage your ultimate beer collection effortlessly.</p>
                <button className="btn btn-outline-secondary" type="button">
                    <Link className="nav-link" to="/beers">Catalog Beers</Link>
                </button>
                </div>
            </div>
            <h3 className="p-3">
                ...and beyond
            </h3>
            <p>
                Take the helm of your brew experience! Easily tailor brewery types, statuses, and more, crafting your BrewFolio to your taste
            </p>
            </div>
            <div className="row align-items-md-stretch">
            <div className="col-md-4 my-2">
                <div className="h-100 p-5 border rounded-3">
                <h2>Types</h2>
                <p>Classify each venue, distinguishing among multitaps, breweries, pubs, and more, to showcase the diversity of the craft beer scene.</p>
                <button className="btn btn-outline-secondary" type="button">
                    <Link className="nav-link" to="/types">Define Venue Types</Link>
                </button>
                </div>
            </div>
            <div className="col-md-4 my-2">
                <div className="h-100 p-5 border rounded-3">
                <h2>Statuses</h2>
                <p>Track the operational state, distinguishing between active brewing hubs and historical landmarks.</p>
                <button className="btn btn-outline-secondary" type="button">
                    <Link className="nav-link" to="/statuses">Update Statuses</Link>
                </button>
                </div>
            </div>
            <div className="col-md-4 my-2">
                <div className="h-100 p-5 border rounded-3">
                <h2 className="text-muted">Coming soon: Visits</h2>
                <p className="text-muted">Monitor your brewery adventures, keeping tabs on all your visits to craft beer havens.</p>
                <button className="btn btn-outline-secondary" type="button" disabled>
                    <Link className="nav-link" to="/">Log Visits!</Link>
                </button>
                </div>
            </div>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Home;