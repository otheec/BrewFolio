import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BeerService } from '../api/BeerService';
import { Beer } from '../model/Beer';
import { PlaceholderIcon, TrashIcon } from '../components/SvgIcons';
import { Link } from "react-router-dom";
import Pagination from '../components/Pagination';

const Beers: React.FC = () => {

  const [beers, setBeers] = useState<Beer[]>([]);
  const [pageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBeers, setTotalBeers] = useState(0);

  useEffect(() => {
    const fetchPaginatedBeers = async () => {
      try {
        const paginatedResponse = await BeerService.getPaginatedBeers(currentPage, pageSize);
        setBeers(paginatedResponse.beers);
        setTotalBeers(paginatedResponse.totalCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPaginatedBeers();
  }, [currentPage, pageSize]);

  const totalPages = Math.ceil(totalBeers / pageSize);

  const handleAddBeerClick = () => {
    alert("Open the form to add a new beer.");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Navbar />
      <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
          <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
            <h1 className="mb-0">Beers</h1>
            <button className="btn btn-success" onClick={handleAddBeerClick}>+ Add Beer</button>
          </div>
          {beers.map((beer) => (
            <div key={beer.id} className="d-flex text-muted pt-3">
              <PlaceholderIcon />
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <Link to={`/beer/${beer.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                    <strong>{beer.name}</strong>
                  </Link>
                  <TrashIcon />
                </div>
                <span className="d-block">{beer.brewery?.name}</span>
              </div>
            </div>
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Beers;
