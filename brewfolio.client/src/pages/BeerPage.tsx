import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Beer } from '../model/Beer';
import { BeerService } from '../api/BeerService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";

const BeerPage: React.FC = () => {
    
    const { beerId } = useParams<{ beerId: string }>();
    const [beer, setBrewery] = useState<Beer | null>(null);

    useEffect(() => {
        const loadBrewery = async () => {
        try {
            const data = await BeerService.getBeerById(Number(beerId));
            setBrewery(data);
        } catch (error) {
            console.error('Failed to fetch brewery data', error);
        }
    };

    loadBrewery();
    }, [beerId]);

    return (
    <>
    <Navbar/>
    <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
            <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                <div className="col-lg-6 px-0">
                    <h1 className="display-4 fst-italic">{beer?.name}</h1>
                    <Link to={`/brewery/${beer?.brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                        <p className="lead my-3">{beer?.brewery.longName}</p>
                    </Link>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2">Description</strong>
                            <p className="card-text mb-auto">
                                {/*beer?.description*/}
                                This golden amber ale pours with a lively, frothy head, offering an inviting aroma of fresh hops and a hint of citrus. On the palate, it presents a harmonious blend of malty sweetness and hoppy bitterness, with subtle notes of caramel and spices. The finish is crisp and refreshing, making it a perfect companion for a sunny day or a cozy evening. Its well-rounded character and smooth finish make it an accessible choice for both seasoned beer enthusiasts and newcomers alike.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <div className="">
                                {/*
                                <Link to={} style={{ textDecoration: 'none', color: "#000000" }}>
                                    <button type="button" className="btn btn-warning me-3">Edit</button>
                                </Link>
                                */ }
                                <button type="button" className="btn btn-warning me-3">Edit</button>
                                <button type="button" className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <Footer/>
    </>
    );
};

export default BeerPage;