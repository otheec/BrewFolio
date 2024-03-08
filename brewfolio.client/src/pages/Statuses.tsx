import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { BreweryStatusService } from '../api/BreweryStatusService';
import { BreweryStatus } from '../model/BreweryStatus';
import { PlaceholderIcon} from '../components/SvgIcons';

const Statuses: React.FC = () => {

  const [statuses, setStatuses] = useState<BreweryStatus[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedStatuses = await BreweryStatusService.getAllStatuses();
        setStatuses(fetchedStatuses);
      } catch (error) {
        console.error('Failed to fetch statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleAddStatusClick = () => {
    alert("Open the form to add a new status.");
  };

  return (
  <>
    <Navbar/>
      <main className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
          <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
              <h1 className="mb-0">Statuses</h1>
              <button className="btn btn-success" onClick={handleAddStatusClick}>+ Add Status</button>
          </div>
          {statuses.map((status) => (
          <div key={status.id} className="d-flex text-muted pt-3">
              <PlaceholderIcon/>
              <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div className="d-flex justify-content-between">
                  <strong className="text-gray-dark">{status.status}</strong>
                  <div className="ms-auto d-flex justify-content-end">
                    <button type="button" className="page-link pe-3">Edit</button>
                    <button type="button" className="page-link">Delete</button>
                </div>
              </div>
              <span className="d-block">Show Breweries</span>
              </div>
          </div>
          ))}
        </div>
      </main>
    <Footer/>
  </>
  );
};

export default Statuses;
