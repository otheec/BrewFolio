import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { Link} from "react-router-dom";
import { BeerService } from '../api/BeerService';
import { Beer } from '../model/Beer';

const BreweryPage: React.FC = () => {
    
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
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="">Beers</span>
                            <span className="badge bg-primary rounded-pill">{brewery?.beers.length}</span>
                        </h4>
                        <div className="list-group">
                            {brewery?.beers.map((beer) => (
                                <div key={beer.id}>
                                    <Link to={`/beer/${beer.id}`} className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                                        <div className="d-flex gap-2 w-100 justify-content-between">
                                            <div>
                                                <h6 className="mb-0">{beer.name}</h6>
                                                <p className="mb-0 opacity-75">Beer note/description</p>
                                            </div>
                                            <small className="opacity-50 text-nowrap">Note/date?</small>
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
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Beer name" 
                                        value={beerName} 
                                        onChange={(e) => setBeerName(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-success" onClick={handleAddBeerClick}>Add Beer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            <div className="d-flex justify-content-between">
                                <Link to={`/brewery/edit/${brewery?.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                                    <button type="button" className="btn btn-warning me-3">Edit</button>
                                </Link>
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