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
import { PlaceholderIcon } from '../components/SvgIcons';

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
  const [searchFilter, setSearchFilter] = useState('');

  const fetchBreweriesAndFilters = useCallback(async () => {
    const statusIds = activeFilters.filter(f => f.type === 'status').map(f => f.id);
    const typeIds = activeFilters.filter(f => f.type === 'type').map(f => f.id);

    try {
      const filteredResponse = await BreweryService.getFilteredAndSearchByLongName(statusIds, typeIds, searchFilter, pagination.currentPage, pagination.pageSize);
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
  }, [pagination.currentPage, pagination.pageSize, activeFilters, searchFilter]);


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

  const fetchSuggestions = useCallback(debounce(async (query: string) => {
    if (query.length >= 2) { // Suggestions should start showing from 2 characters
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

  return (
    <>
      <Navbar />
      <main className="container mb-4 mt-2">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
          <h1 className="border-bottom">Breweries</h1>

          {/* Menu options for desktop*/}
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
                    onBlur={() => setSuggestions([])}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        setSearchFilter(searchQuery);
                        setSearchQuery(''); // Clear the search input
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


          {/* Menu options for mobile*/}
          <div className="d-flex flex-column d-sm-none">
            <div className="d-flex pb-2 justify-content-between">
              {/* Filters: Will wrap into a single line */}
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
            {/* Search bar */}
            <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    value={searchQuery}
                    onBlur={() => setSuggestions([])}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        setSearchFilter(searchQuery);
                        setSearchQuery(''); // Clear the search input
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
            {/* Add brewery button */}
            <Link to={`/brewery/add`} className="btn btn-success w-100 text-nowrap mb-2">+ Add Brewery</Link>
          </div>



          {/* Active filters */}
          <div className="active-filters pb-2">
            {/*display active search filter phrase*/}
            {searchFilter === '' ? null :
              <span className="badge rounded-pill text-bg-warning me-2" onClick={() => setSearchFilter('')}>
                <span aria-hidden="true">{searchFilter}&times;</span>
              </span>
            }
            {/*display active search filter for statuses and types*/}
            {activeFilters.map((filter, index) => (
              <span key={index} className="badge rounded-pill text-bg-primary me-2" onClick={() => removeFilter(filter)}>
                {filter.name} <span aria-hidden="true">&times;</span>
              </span>
            ))}
          </div>
          {pagination.breweries.map((brewery, index) => (
            <Link to={`/brewery/${brewery.id}`} style={{ textDecoration: 'none', color: "#000000" }} key={index}>
              <div key={brewery.id} className="d-flex text-muted pt-3">
                <PlaceholderIcon />
                <PlaceholderIcon />
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
            </Link>
          ))}
        </div>
        <Pagination currentPage={pagination.currentPage} totalPages={Math.ceil(pagination.totalBreweries / pagination.pageSize)} onPageChange={handlePageChange} />
      </main>
      <Footer />
    </>
  );
};

export default Breweries;
