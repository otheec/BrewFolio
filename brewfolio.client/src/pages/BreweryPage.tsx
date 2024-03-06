import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link} from "react-router-dom";

const BreweryPage: React.FC = () => {
    
    const { breweryId } = useParams<{ breweryId: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);

    useEffect(() => {
        const loadBrewery = async () => {
        try {
            const data = await BreweryService.getBreweryById(Number(breweryId));
            setBrewery(data);
        } catch (error) {
            console.error('Failed to fetch brewery data', error);
        }
    };

    loadBrewery();
    }, [breweryId]);

    const handleAddBeerClick = () => {
        alert("Add a new beer.");
      };

    return (
    <>
    <Navbar/>
    <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
            <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
                <div className="col-lg-6 px-0">
                <h1 className="display-4 fst-italic">{brewery?.name}</h1>
                <p className="lead my-3">{brewery?.longName}</p>
                <div className="lead">{brewery?.type.type}</div>
                <div className="lead">{brewery?.status.status}</div>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                    <div className="list-group">
                        {brewery?.beers.map((beer) => (
                            <div key={beer.id}>
                                <Link to={`/beer/${beer.id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                    <div className="d-flex gap-2 w-100 justify-content-between">
                                        <div>
                                            <h6 className="mb-0">{beer.name}</h6>
                                            <p className="mb-0 opacity-75">Beer note/description</p>
                                        </div>
                                        <small className="opacity-50 text-nowrap">Edit</small>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Beer name"/>
                                <button type="submit" className="btn btn-success" onClick={handleAddBeerClick}>Add Beer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <div className="pb-3">
                            <label htmlFor="state" className="form-label">Status</label>
                            <select className="form-select" id="state" required>
                                <option value="">{brewery?.status.status}</option>
                                <option>sample status</option>
                            </select>
                            <div className="invalid-feedback">
                                Please provide a valid Status.
                            </div>
                        </div>
                        <div>
                            <label htmlFor="state" className="form-label">Type</label>
                            <select className="form-select" id="state" required>
                                <option value="">{brewery?.type.type}</option>
                                <option>sample type</option>
                            </select>
                            <div className="invalid-feedback">
                                Please provide a valid Type.
                            </div>
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

export default BreweryPage;