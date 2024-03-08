import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BeerService } from '../api/BeerService';
import { Beer } from '../model/Beer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';
import { PlaceholderIcon } from '../components/SvgIcons';
import { LinkIcon } from '../components/SvgIcons';

interface PaginationState {
  beers: Beer[];
  currentPage: number;
  pageSize: number;
  totalBeers: number;
}

const Beers: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    beers: [],
    currentPage: 1,
    pageSize: 50,
    totalBeers: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);

  const fetchBeers = useCallback(async () => {
    try {
      const paginatedResponse = await BeerService.getPaginatedBeers(pagination.currentPage, pagination.pageSize);
      setPagination((prev) => ({
        ...prev,
        beers: paginatedResponse.beers,
        totalBeers: paginatedResponse.totalCount,
      }));
    } catch (error) {
      console.error('Failed to fetch beers:', error);
      alert('Failed to fetch beers. Please try again later.');
    }
  }, [pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const handleDeleteBeer = async () => {
    if (!selectedBeer) return;
    try {
      await BeerService.deleteBeer(selectedBeer.id);
      fetchBeers();
      setShowModal(false);
    } catch (error) {
      console.error('Failed to delete beer:', error);
      alert('Failed to delete the beer. Please try again later.');
    }
  };

  const openModalForDelete = (beer: Beer) => {
    setSelectedBeer(beer);
    setShowModal(true);
  };

  return (
    <>
      <Navbar />
      <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
          <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
            <h1 className="mb-0">Beers</h1>
            <button className="btn btn-success">+ Add Beer</button>
          </div>
          {pagination.beers.map((beer) => (
            <div key={beer.id} className="d-flex text-muted pt-3">
              <PlaceholderIcon />
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
                <div className="d-flex justify-content-between">
                  <Link to={`/beer/${beer.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                    <strong>{beer.name}</strong>
                  </Link>
                  <div className="ms-auto d-flex justify-content-end">
                    <button type="button" className="page-link pe-3">Edit</button>
                    <button type="button" className="page-link" onClick={() => openModalForDelete(beer)}>Delete</button>
                  </div>
                </div>
                <Link to={`/brewery/${beer.brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                  <span className="d-block">{beer.brewery?.name}  <LinkIcon/></span>
                </Link>
              </div>
            </div>
          ))}
          <Pagination currentPage={pagination.currentPage} totalPages={Math.ceil(pagination.totalBeers / pagination.pageSize)} onPageChange={handlePageChange} />
        </div>
      </main>
      <Footer />

      {showModal && (
        <DeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteBeer}
          content={selectedBeer?.name || ''}
        />
      )}
    </>
  );
};

export default Beers;
