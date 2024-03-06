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
        </div>
    </main>
    <Footer/>
    </>
    );
};

export default BeerPage;