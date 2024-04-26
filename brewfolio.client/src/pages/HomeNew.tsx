import React from "react";


import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { BeerService } from '../api/BeerService';
import { Beer } from '../model/Beer';



const HomeNew: React.FC = () => {


    const { breweryId } = useParams<{ breweryId: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [beerName, setBeerName] = useState('');

    const loadBrewery = useCallback(async () => {
        try {
            const data = await BreweryService.getBreweryById(Number(breweryId));
            setBrewery(data);
        } catch (error) {
            console.error('Failed to fetch brewery data', error);
        }
    }, [breweryId]);

    useEffect(() => {
        loadBrewery();
    }, [loadBrewery]);

    const handleAddBeerClick = async () => {
        const beerData = {
            id: 0,
            name: beerName,
            brewery: {
                ...brewery,
                beers: [] // Explicitly set beers to an empty array, JSON serialization will loop otherwise
            }
        };

        try {
            const breweryId = brewery?.id as number;
            await BeerService.addBeer(beerData as Beer, breweryId);

            await loadBrewery();

            setBeerName('');
        } catch (error) {
            console.error('Failed to add beer:', error);
            alert('Failed to add the beer. See console for details.');
        }
    };

    return (
        <>

            <header className="p-3 mb-3 border-bottom">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" className="nav-link px-2 link-secondary">Home</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Breweries</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Beers</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Other</a></li>
                            <li><a href="#" className="nav-link px-2 link-body-emphasis">Repository</a></li>
                        </ul>

                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li><a className="dropdown-item" href="#">New project...</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div className="row">
                <div className="col-3 ps-5">
                    <div className="card mb-4 rounded-3 shadow-sm">
                        <div className="card-body">
                            <div className="col-12">
                                <form id="beerInfo-form">
                                    <div className="pb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={brewery?.name || ''}
                                            required />
                                    </div>
                                    <div className="pb-3">
                                        <label htmlFor="longName" className="form-label">Long name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="longName"
                                            name="longName"
                                            value={brewery?.longName || ''}
                                            required />
                                    </div>
                                    <div className="pb-3">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select
                                            className="form-select"
                                            name="status"
                                            id="status"
                                            value={brewery?.status?.id || ''}
                                            required>
                                        </select>
                                    </div>
                                    <div className="pb-3">
                                        <label htmlFor="type" className="form-label">Type</label>
                                        <select
                                            className="form-select"
                                            name="type"
                                            id="type"
                                            value={brewery?.type?.id || ''}
                                            required>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary  w-100">Add Brewery</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="pe-5">
                            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                                <div className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-header d-flex justify-content-center align-items-center py-3">
                                            <h4 className="my-0 fw-normal">
                                                Breweries
                                            </h4>
                                            <span className="ms-3 badge bg-primary rounded-pill">857</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="list-unstyled mt-3 mb-4">Manage your favorite breweries with ease.</p>
                                            <button type="button" className="w-100 btn btn btn-primary">Get started</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-header d-flex justify-content-center align-items-center py-3">
                                            <h4 className="my-0 fw-normal">
                                                Beers
                                            </h4>
                                            <span className="ms-3 badge bg-primary rounded-pill">2357</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="list-unstyled mt-3 mb-4">Discover and manage your beer collection.</p>
                                            <button type="button" className="w-100 btn btn btn-primary">Get started</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-header py-3">
                                            <h4 className="my-0 fw-normal">Others</h4>
                                        </div>
                                        <div className="card-body">
                                            <p className="list-unstyled mt-3 mb-4">Expand your brew experience further.</p>
                                            <button type="button" className="w-100 btn btn btn-primary">Get started</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="pe-5">
                            <div className="col">
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-body">
                                        <h4 className="my-0 p-2 fw-normal">
                                            Breweries
                                        </h4>
                                        <br />
                                        <div className="accordion" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Accordion Item #1
                                                    </button>
                                                </h2>
                                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Accordion Item #2
                                                    </button>
                                                </h2>
                                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="accordion-item">
                                                <h2 className="accordion-header">
                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Accordion Item #3
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                    <div className="accordion-body">
                                                        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeNew;