import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { BreweryTypeService } from '../api/BreweryTypeService';
import { BreweryType } from '../model/BreweryType';
import { PlaceholderIcon, TrashIcon} from '../components/SvgIcons';

const Types: React.FC = () => {

  const [statuses, setStatuses] = useState<BreweryType[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const fetchedTypes = await BreweryTypeService.getAllTypes();
        setStatuses(fetchedTypes);
      } catch (error) {
        console.error('Failed to fetch statuses:', error);
      }
    };

    fetchStatuses();
  }, []);

  const handleAddTypeClick = () => {
    alert("Open the form to add a new type.");
  };

    return (
    <>
    <Navbar/>
    <main className="container my-4">
    <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
      <div className="d-flex border-bottom justify-content-between align-items-center pb-3">
          <h1 className="mb-0">Types</h1>
          <button className="btn btn-success" onClick={handleAddTypeClick}>+ Add Type</button>
      </div>
    {statuses.map((type) => (
    <div key={type.id} className="d-flex text-muted pt-3">
        <PlaceholderIcon/>
        <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
        <div className="d-flex justify-content-between">
            <strong className="text-gray-dark">{type.type}</strong>
            <TrashIcon/>
        </div>
        <span className="d-block">{/*popisek statuses*/}Show Breweries</span>
        </div>
    </div>
    ))}
    </div>
    </main>
    <Footer/>
    </>
    );
};

export default Types;
