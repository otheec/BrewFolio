import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BreweryService } from '../api/BreweryService';
import { BreweryStatusService } from '../api/BreweryStatusService';
import { BreweryTypeService } from '../api/BreweryTypeService';
import { Brewery } from '../model/Brewery';
import { BreweryStatus } from '../model/BreweryStatus';
import { BreweryType } from '../model/BreweryType';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import { SearchIcon } from '../components/SvgIcons';
import { debounce } from "lodash";

interface PaginationState {
  breweries: Brewery[];
  currentPage: number;
  pageSize: number;
  totalBreweries: number;
}

interface ActiveFilter {
  id: number;
  type: 'status' | 'type';
  name: string;
}

const Breweries: React.FC = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    breweries: [],
    currentPage: 1,
    pageSize: 50,
    totalBreweries: 0,
  });

  const [statuses, setStatuses] = useState<BreweryStatus[]>([]);
  const [types, setTypes] = useState<BreweryType[]>([]);
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Brewery[]>([]);

  const fetchBreweriesAndFilters = useCallback(async () => {
    const statusIds = activeFilters.filter(f => f.type === 'status').map(f => f.id);
    const typeIds = activeFilters.filter(f => f.type === 'type').map(f => f.id);

    try {
      const filteredResponse = await BreweryService.getFilteredPaginatedBreweries(statusIds, typeIds, pagination.currentPage, pagination.pageSize);
      const fetchedStatuses = await BreweryStatusService.getAllStatuses();
      const fetchedTypes = await BreweryTypeService.getAllTypes();

      setPagination(prev => ({
        ...prev,
        breweries: filteredResponse.breweries,
        totalBreweries: filteredResponse.totalCount,
      }));

      setStatuses(fetchedStatuses);
      setTypes(fetchedTypes);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to fetch data. Please try again later.');
    }
  }, [pagination.currentPage, pagination.pageSize, activeFilters]);


  useEffect(() => {
    fetchBreweriesAndFilters();
  }, [fetchBreweriesAndFilters]);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  const removeFilter = (filterToRemove: ActiveFilter) => {
    setActiveFilters(prevFilters => prevFilters.filter(filter => filter.id !== filterToRemove.id || filter.type !== filterToRemove.type));
  };

  const handleFilterClick = (filter: ActiveFilter) => {
    const isAlreadyActive = activeFilters.some(activeFilter => activeFilter.id === filter.id && activeFilter.type === filter.type);
    if (!isAlreadyActive) {
      setActiveFilters(prevFilters => [...prevFilters, filter]);
    }
  };

  const exportActiveFilterIds = () => {
    const activeTypeIds = activeFilters
      .filter(filter => filter.type === 'type')
      .map(filter => filter.id);
    const activeStatusIds = activeFilters
      .filter(filter => filter.type === 'status')
      .map(filter => filter.id);

    console.log('Active Type IDs:', activeTypeIds);
    console.log('Active Status IDs:', activeStatusIds);

    return { activeTypeIds, activeStatusIds };
  };

  const fetchSuggestions = useCallback(debounce(async (query: string) => {
    if (query.length >= 2) { // Assuming suggestions should start showing from 2 characters
      try {
        const breweries = await BreweryService.searchBreweriesByLongName(query);
        setSuggestions(breweries);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300), []); // Debounce for 300ms


  useEffect(() => {
    fetchSuggestions(searchQuery);
    return () => fetchSuggestions.cancel(); // Cancel the debounce on cleanup
  }, [searchQuery, fetchSuggestions]);

  // Logginng the active filter IDs to the console
  /*useEffect(() => {
    exportActiveFilterIds();
  }, [activeFilters]);*/

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
                {statuses.map((status) => (
                  <li key={status.id} onClick={() => handleFilterClick({ id: status.id, type: 'status', name: status.status })}>
                    <div className="dropdown-item">
                      {status.status}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Type Filter
              </button>
              <ul className="dropdown-menu">
                {types.map((type) => (
                  <li key={type.id} onClick={() => handleFilterClick({ id: type.id, type: 'type', name: type.type })}>
                    <div className="dropdown-item">
                      {type.type}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="d-flex" style={{ position: 'relative' }}>
            <div className="pe-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      console.log(searchQuery);
                      e.preventDefault(); // Prevent the form from being submitted
                    }
                  }}
                />
                <span className="input-group-text">
                  <SearchIcon />
                </span>
              </div>
              {searchQuery.length >= 2 && suggestions.length > 0 && (
                <ul className="list-group" style={{ position: 'absolute', width: '100%', zIndex: 1000 }}>
                  {suggestions.map((brewery, index) => (
                    <li key={index} className="list-group-item">
                      <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }}>
                        {brewery.longName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link to={`/brewery/add`} style={{ textDecoration: 'none', color: "#000000" }}>
              <button className="btn btn-success text-nowrap">+ Add Brewery</button>
            </Link>
          </div>

        </div>

        <div className="active-filters pb-2">
          {activeFilters.map((filter, index) => (
            <span key={index} className="badge rounded-pill text-bg-primary me-2" onClick={() => removeFilter(filter)}>
              {filter.name} <span aria-hidden="true">&times;</span>
            </span>
          ))}
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
                  <span className="d-block">{brewery.longName}, {brewery.type.type}, {brewery.status.status}</span>
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
