import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useParams, useNavigate  } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BreweryStatus } from '../model/BreweryStatus';
import { BreweryType } from '../model/BreweryType';
import { BreweryStatusService } from '../api/BreweryStatusService';
import { BreweryTypeService } from '../api/BreweryTypeService';
import DeleteModal from '../components/DeleteModal';

const BreweryEditPage: React.FC = () => {
    const { breweryId } = useParams<{ breweryId?: string }>();
    const navigate = useNavigate();
    
    const [brewery, setBrewery] = useState<Brewery | null>({
        id: 0,
        name: '',
        longName: '',
        type: {} as BreweryType,
        status: {} as BreweryStatus,
        visited: false,
        beers: []
    });

    const [statuses, setStatuses] = useState<BreweryStatus[]>([]);
    const [types, setTypes] = useState<BreweryType[]>([]);

    const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedStatuses, fetchedTypes] = await Promise.all([
                    BreweryStatusService.getAllStatuses(),
                    BreweryTypeService.getAllTypes(),
                ]);
                setStatuses(fetchedStatuses);
                setTypes(fetchedTypes);

                if (breweryId) {
                    const data = await BreweryService.getBreweryById(Number(breweryId));
                    setBrewery(data);
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [breweryId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBrewery(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!brewery) return;
    
        // Assuming statuses and types are arrays of objects with an 'id' and 'name'
        let updatedField;
        if (name === "status") {
            updatedField = statuses.find(status => status.id.toString() === value);
        } else if (name === "type") {
            updatedField = types.find(type => type.id.toString() === value);
        }
    
        if (updatedField) {
            setBrewery({ ...brewery, [name]: updatedField });
        }
    };
      

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!brewery) return;
        
        if (breweryId && brewery) {
            //await BreweryService.updateBrewery(brewery);
        } else {
            //await BreweryService.addBrewery(brewery);
        }

        navigate('/breweries');
    };

    const handleDeleteBrewery = async () => {
        if (!selectedBrewery) return;
        try {
          //await BreweryService.deleteBrewery(selectedBrewery.id);
          setShowModal(false);
          navigate('/breweries');
        } catch (error) {
          console.error('Failed to delete brewery:', error);
          alert('Failed to delete the brewery. Please try again later.');
        }
      };
    
      const openModalForDelete = (brewery: Brewery) => {
        setSelectedBrewery(brewery);
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
                                value={brewery?.name || ''} 
                                onChange={handleChange}
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
                                onChange={handleChange}
                                required />
                        </div>
                        <div className="pb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select 
                                className="form-select" 
                                name="status"
                                id="status"
                                value={brewery?.status?.id || ''} 
                                onChange={handleSelectChange} 
                                required>
                                {statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="pb-3">
                            <label htmlFor="type" className="form-label">Type</label>
                            <select 
                                className="form-select" 
                                name="type" 
                                id="type"
                                value={brewery?.type?.id || ''} 
                                onChange={handleSelectChange} 
                                required>
                                {types.map(type => (
                                    <option key={type.id} value={type.id}>{type.type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <button type="submit" className="btn btn-primary">{breweryId ? 'Update Brewery' : 'Add Brewery'}</button>
                            {breweryId && <button type="button" className="btn btn-danger ms-2" onClick={() => openModalForDelete(brewery!)}>Delete</button>}
                        </div>
                    </form>
                </div>
            </main>
            <Footer />

            {showModal && (
                <DeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDeleteBrewery}
                content={`${selectedBrewery?.name}`}
                />
            )}
        </>
    );
};

export default BreweryEditPage;
