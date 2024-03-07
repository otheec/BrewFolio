import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brewery } from '../model/Brewery';
import { BreweryService } from '../api/BreweryService';
import { useEffect, useState } from 'react';
import { PlaceholderIcon} from '../components/SvgIcons';
import { Link} from "react-router-dom";
import Pagination from '../components/Pagination';

const Breweries: React.FC = () => {

  const [breweries, setBreweries] = useState<Brewery[]>([]);
  
  const [pageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBreweries, setTotalBeers] = useState(0);

  const totalPages = Math.ceil(totalBreweries / pageSize);

  const [showModal, setShowModal] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);

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

  const handleAddBreweryClick = () => {
    alert("Open the form to add a new brewery.");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (brewery: Brewery) => {
    setSelectedBrewery(brewery);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleConfirmDelete = () => {
    console.log("Deleting beer:", setSelectedBrewery);
    // Call delete method
    closeModal();
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
          <div className="ms-auto d-flex justify-content-end">
            <button type="button" className="page-link pe-3">Edit</button>
            <button type="button" className="page-link" onClick={() => handleDeleteClick(brewery)}>Delete</button>
          </div>
        </div>
        <span className="d-block">{brewery.longName}</span>
        </div>
      </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  </main>
  <Footer/>

  <div className={`modal ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }} tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Deletion</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete "{selectedBrewery?.name}" ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
  {showModal ? <div className="modal-backdrop fade show"></div> : null}
  </>
  );
};

export default Breweries;
