import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Repository: React.FC = () => {

    const handleUploadClick = () => {
        alert("Upload your CSV file.");
    };

    const handleDownloadClick = () => {
        alert("Download your CSV file.");
    };


    return(
        <>
        <Navbar/>
        <div className="container my-4">
        <div className="my-3 p-3 bg-body-tertiary rounded shadow-sm">
            <div className="pb-3">
                <h1 className="mb-0">Repository</h1>
            </div>
            <div className="row align-items-md-stretch">
                <div className="p-3 my-2 bg-body-secondary border rounded-3">
                    <div className="mb-3">
                        <h2>Upload CSV</h2>
                    </div>
                    <div className="mb-3">
                        <p>Elevate your collection - upload your CSV and let the journey unfold!</p>
                    </div>
                    <div className="mb-3">
                        <input type="file" className="form-control form-control-sm" aria-label="Small file input example"></input>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleUploadClick}>
                            Upload
                        </button>
                    </div>
                </div>
                <div className="p-3 my-2 bg-body-secondary border rounded-3">
                    <div className="mb-3">
                        <h2>Download CSV</h2>
                    </div>
                    <div className="mb-3">
                        <p>Export your data efficiently with our CSV download service</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-secondary" onClick={handleDownloadClick}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default Repository;