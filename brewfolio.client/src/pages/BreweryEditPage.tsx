import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BreweryStatus } from '../model/BreweryStatus';
import { BreweryType } from '../model/BreweryType';
import { BreweryStatusService } from '../api/BreweryStatusService';
import { BreweryTypeService } from '../api/BreweryTypeService';

const BreweryEditPage: React.FC = () => {
    
    const { breweryId } = useParams<{ breweryId: string }>();
    const [brewery, setBrewery] = useState<Brewery | null>(null);
    const [statuses, setStatuses] = useState<BreweryStatus[]>([]);
    const [types, setTypes] = useState<BreweryType[]>([]);
    useEffect(() => {
        const loadBrewery = async () => {
            try {
                const data = await BreweryService.getBreweryById(Number(breweryId));
                setBrewery(data);
            } catch (error) {
                console.error('Failed to fetch brewery data', error);
            }
        };

        const fetchStatuses = async () => {
            try {
                const fetchedStatuses = await BreweryStatusService.getAllStatuses();
                setStatuses(fetchedStatuses);
            } catch (error) {
                console.error('Failed to fetch statuses:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const fetchedTypes = await BreweryTypeService.getAllTypes();
                setTypes(fetchedTypes);
            } catch (error) {
                console.error('Failed to fetch types:', error);
            }
        };

        loadBrewery();
        fetchStatuses();
        fetchTypes();
    }, [breweryId]);


    return (
    <>
    <Navbar/>
    <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
            <div className="pb-3">
                <label htmlFor="firstName" className="form-label">Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value={brewery?.name} required/>
            </div>
            <div className="pb-3">
                <label htmlFor="firstName" className="form-label">Long name</label>
                <input type="text" className="form-control" id="firstName" placeholder="" value={brewery?.longName} required/>
            </div>
            <div className="pb-3">
                <label htmlFor="statusSelect" className="form-label">Status</label>
                <select className="form-select" id="statusSelect" value={brewery?.status?.id}required>
                    {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                            {status.status}
                        </option>
                    ))}
                </select>
            </div>
            <div className="pb-3">
                <label htmlFor="typeSelect" className="form-label">Type</label>
                <select className="form-select" id="typeSelect" value={brewery?.type?.id} required>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </main>
    <Footer/>
    </>
    );
};

export default BreweryEditPage;