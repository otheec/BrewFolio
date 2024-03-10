import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BreweryService } from '../api/BreweryService';
import { Brewery } from '../model/Brewery';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { PlaceholderIcon } from '../components/SvgIcons';
import { SearchIcon } from '../components/SvgIcons';

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
      <main className="container mb-4 mt-2">
        <h1 className="border-bottom">Breweries</h1>
        <div className="d-none d-sm-flex pb-2 justify-content-between">
          <div className="d-flex">
            <div className="dropdown pe-2">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Status Filter
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Type Filter
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
          </div>
          <div className="d-flex">
            <div className="pe-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search..." aria-label="Search" />
                <span className="input-group-text">
                  <SearchIcon />
                </span>
              </div>
            </div>
            <Link to={`/brewery/add`} style={{ textDecoration: 'none', color: "#000000" }}>
              <button className="btn btn-success text-nowrap">+ Add Brewery</button>
            </Link>
          </div>
        </div>
        <div className="border rounded">
          <div className="border-bottom p-2 bg-body-secondary  ">
            <div className="row">
              <div className="col-3">
                Name
              </div>
              <div className="col-7">
                Long name
              </div>
            </div>
          </div>
          {pagination.breweries.map((brewery, index) => (
            <div key={brewery.id} className={index !== pagination.breweries.length - 1 ? "border-bottom p-2" : "p-2"}>
              <div className="row">
                <div className="col-3">
                  <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                    {brewery.name}
                  </Link>
                </div>
                <div className="col-7">
                  <span className="d-block">{brewery.longName}</span>
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <Link to={`/brewery/edit/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                    <button type="button" className="page-link pe-3">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination currentPage={pagination.currentPage} totalPages={Math.ceil(pagination.totalBreweries / pagination.pageSize)} onPageChange={handlePageChange} />
      </main>
      <Footer />
    </>
  );
};

export default Breweries;
