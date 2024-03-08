import React from 'react';

interface ConfirmationModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm, content }) => {
  return (
    <>
    <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }} tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Deletion</h5>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete "{content}"?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ConfirmationModal;
