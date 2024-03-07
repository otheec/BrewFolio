import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useEffect, useState } from 'react';
import { PlaceholderIcon, TrashIcon} from '../components/SvgIcons';
import { Link} from "react-router-dom";
import Pagination from '../components/Pagination';

const Breweries: React.FC = () => {

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [pageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBreweries, setTotalBeers] = useState(0);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const paginatedResponse = await BreweryService.getPaginatedBreweries(currentPage, pageSize);
        setBreweries(paginatedResponse.breweries);
        setTotalBeers(paginatedResponse.totalCount);
      } catch (error) {
        console.error(error);
      }

    };

    fetchBreweries();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalBreweries / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddBreweryClick = () => {
    alert("Open the form to add a new brewery.");
  };

  return (
    <>
    <Navbar/>
    <main className="container my-4">
    <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
      <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
          <h1 className="mb-0">Breweries</h1>
          <button className="btn btn-success" onClick={handleAddBreweryClick}>+ Add Brewery</button>
      </div>
      {breweries.map((brewery) => (
      <div key={brewery.id} className="d-flex text-muted pt-3">
        <PlaceholderIcon/>
        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div className="d-flex justify-content-between">
          <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                      <strong>{brewery.name}</strong>
          </Link>
          <TrashIcon/>
        </div>
        <span className="d-block">{brewery.longName}</span>
        </div>
      </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  </main>
  <Footer/>
  </>
  );
};

export default Breweries;
