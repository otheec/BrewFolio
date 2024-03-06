import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BeerService} from '../api/BeerService';
import { Beer } from '../model/Beer';
import { useEffect, useState } from 'react';
import { PlaceholderIcon, TrashIcon} from '../components/SvgIcons';
import { Link} from "react-router-dom";

const Beers: React.FC = () => {

  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const beers = await BeerService.getAllBeers();
        setBeers(beers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBeers();
  }, []);

  const handleAddBeerClick = () => {
    alert("Open the form to add a new beer.");
  };

  return (
    <>
    <Navbar/>
    <main className="container my-4">
    <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
      <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
          <h1 className="mb-0">Beers</h1>
          <button className="btn btn-success" onClick={handleAddBeerClick}>+ Add Beer</button>
      </div>
      {beers.map((beer) => (
      <div key={beer.id} className="d-flex text-muted pt-3">
        <PlaceholderIcon/>
        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div className="d-flex justify-content-between">
            <Link to={`/beer/${beer.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
              <strong className="text-gray-dark">{beer.name}</strong>
            </Link>
            <TrashIcon/>
        </div>
        <span className="d-block">{beer.brewery.name}</span>
        </div>
      </div>
      ))}
      <small className="d-block text-end mt-3">
        <>See all beers</>
      </small>
    </div>
  </main>
  <Footer/>
  </>
  );
};

export default Beers;
