import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Beer } from '../model/Beer';
import { BeerService } from '../api/BeerService';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DeleteModal from '../components/DeleteModal';

const BeerEditPage: React.FC = () => {
    const { beerId } = useParams<{ beerId?: string }>();
    const navigate = useNavigate();

    const [beer, setBeer] = useState<Beer | null>(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (beerId) {
                    const data = await BeerService.getBeerById(Number(beerId));
                    setBeer(data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [beerId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBeer(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleBreweryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBeer(prev => {
            if (!prev) return null;
            return { ...prev, brewery: { ...prev.brewery, [name]: value } };
        });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!beer) return;

        if (beerId && beer) {
            await BeerService.updateBeer(beer.id, beer, beer.brewery.id);
        } else {
            //await BreweryService.addBrewery(brewery);
        }

        navigate('/beers');
    };

    const handleDelete = async () => {
        if (!beer) return;
        try {
            await BeerService.deleteBeer(beer.id);
            setShowModal(false);
            navigate('/beers');
        } catch (error) {
            console.error('Failed to delete beer:', error);
            alert('Failed to delete the beer. Please try again later.');
        }
    };

    const openModalForDelete = () => {
        setShowModal(true);
    };

    return (
        <>
            <Navbar />
            <main className="container my-4">
                <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
                    <form id="beerInfo-form" onSubmit={handleSubmit}>
                        <div className="pb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={beer?.name || ''}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="pb-3">
                            <label htmlFor="breweryName" className="form-label">Brewery Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="breweryName"
                                name="breweryName"
                                value={beer?.brewery?.name || ''}
                                required />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary">{beerId ? 'Update Beer' : 'Add Beer'}</button>
                            {beerId && <button type="button" className="btn btn-danger ms-2" onClick={openModalForDelete}>Delete</button>}
                        </div>
                    </form>
                </div>
            </main>
            <Footer />

            {showModal && beer && (
                <DeleteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    content={`Are you sure you want to delete ${beer.name}?`}
                />
            )}
        </>
    );
};

export default BeerEditPage;
