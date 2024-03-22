import React from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import breweryCardImage from '../images/brewery_card.jpg';
import beerCardImage from '../images/beer_card.jpg';
import './Home.css';



const Home: React.FC = () => {
    return (
        <>  
            <Navbar />

            {/* Main Content */}
            <div className=" container-fluid ">

                {/* Jumbotron */}
                <div className="container bg-body-tertiary  py-4">

                    {/* First card row */}
                    <div className="row align-items-md-stretch">

                        {/* Welcome message */}
                        <h1 className="display-5 fw-bold p-3 pt-0">Welcome to the BrewFolio!</h1>

                        {/* Breweries card */}
                        <div className="col-md-6 my-2">
                            <div className="card shadow h-100">
                                <div className="card-image-container rounded-top">
                                    {/* Overlay */}
                                    <div className="card-image-overlay"></div>
                                    {/* Image */}
                                    <img src={breweryCardImage} alt="Brewery" />
                                </div>
                                <div className="card-body p-3">
                                    <h2 className="card-title">Breweries</h2>
                                    <p>Take control of the brewery scene! Jump into our Breweries Management to add, explore, and update your favorite breweries in a snap on BrewFolio.</p>
                                    <div className="text-end">
                                        <button className="btn btn-primary" type="button">
                                            <Link className="nav-link" to="/breweries">Manage Breweries</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Beers card */}
                        <div className="col-md-6 my-2">
                            <div className="card shadow h-100">
                                <div className="card-image-container rounded-top">
                                    {/* Overlay */}
                                    <div className="card-image-overlay"></div>
                                    {/* Image */}
                                    <img src={beerCardImage} alt="Brewery" />
                                </div>
                                <div className="card-body p-3">
                                    <h2 className="card-title">Beers</h2>
                                    <p>Craft your beer journey! Navigate to our Beers Management to curate, discover, and manage your ultimate beer collection effortlessly.</p>
                                    <div className="text-end">
                                        <button className="btn btn-primary" type="button">
                                            <Link className="nav-link" to="/beers">Catalog Beers</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        
                        <h3 className="p-3">
                            ...and beyond
                        </h3>
                        <p>
                            Take the helm of your brew experience! Easily tailor brewery types, statuses, and more, crafting your BrewFolio to your taste
                        </p>
                    </div>

                    {/* Second card row */}
                    <div className="row align-items-md-stretch">

                        {/* Types card */}
                        <div className="col-md-4 my-2">
                            <div className="card shadow h-100 p-3">
                                <div className="card-body">
                                    <h2 className="card-title">Types</h2>
                                    <p>Classify each venue, distinguishing among multitaps, breweries, pubs, and more, to showcase the diversity of the craft beer scene.</p>
                                    <button className="btn btn-primary" type="button">
                                        <Link className="nav-link" to="/types">Define Venue Types</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Statuses card */}
                        <div className="col-md-4 my-2">
                            <div className="card shadow h-100 p-3">
                                <div className="card-body">
                                    <h2 className="card-title">Statuses</h2>
                                    <p>Track the operational state, distinguishing between active brewing hubs and historical landmarks.</p>
                                    <button className="btn btn-primary" type="button">
                                        <Link className="nav-link" to="/statuses">Update Statuses</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Visits card */}
                        <div className="col-md-4 my-2">
                            <div className="card shadow h-100 p-3">
                                <div className="card-body">
                                    <h2 className="card-title">Coming soon: Visits</h2>
                                    <p className="text-muted">Monitor your brewery adventures, keeping tabs on all your visits to craft beer havens.</p>
                                    <button className="btn btn-primary" type="button" disabled>
                                        <Link className="nav-link" to="/">Log Visits!</Link>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                <Footer />
            </div>
        </>
    );
};

export default Home;