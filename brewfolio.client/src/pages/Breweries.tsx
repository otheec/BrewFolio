import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BreweryService } from '../api/BreweryService';
import { Brewery } from '../model/Brewery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { PlaceholderIcon } from '../components/SvgIcons';

interface PaginationState {
  breweries: Brewery[];
  currentPage: number;
  pageSize: number;
  totalBreweries: number;
}

const Breweries: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    breweries: [],
    currentPage: 1,
    pageSize: 50,
    totalBreweries: 0,
  });

  const fetchBreweries = useCallback(async () => {
    try {
      const paginatedResponse = await BreweryService.getPaginatedBreweries(pagination.currentPage, pagination.pageSize);
      setPagination((prev) => ({
        ...prev,
        breweries: paginatedResponse.breweries,
        totalBreweries: paginatedResponse.totalCount,
      }));
    } catch (error) {
      console.error('Failed to fetch breweries:', error);
      alert('Failed to fetch breweries. Please try again later.');
    }
  }, [pagination.currentPage, pagination.pageSize]);

  useEffect(() => {
    fetchBreweries();
  }, [fetchBreweries]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  return (
    <>
      <Navbar />
      <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
          <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
            <h1 className="mb-0">Breweries</h1>
            <Link to={`/brewery/add`} style={{ textDecoration: 'none', color: "#000000" }}>
              <button className="btn btn-success">+ Add Brewery</button>
            </Link>
          </div>
          {pagination.breweries.map((brewery) => (
          <div key={brewery.id} className="d-flex text-muted pt-3">
            <PlaceholderIcon/>
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div className="d-flex justify-content-between">
              <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                          <strong>{brewery.name}</strong>
              </Link>
              <div className="ms-auto d-flex justify-content-end">
                <Link to={`/brewery/edit/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                  <button type="button" className="page-link pe-3">Edit</button>
                </Link>
              </div>
            </div>
            <span className="d-block">{brewery.longName}</span>
            </div>
          </div>
          ))}
          <Pagination currentPage={pagination.currentPage} totalPages={Math.ceil(pagination.totalBreweries / pagination.pageSize)} onPageChange={handlePageChange} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Breweries;
