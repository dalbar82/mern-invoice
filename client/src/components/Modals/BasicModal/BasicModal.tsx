import React from "react";
import "../modal.css"; 

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
  children: React.ReactNode; // Allows passing JSX elements inside the modal
}

const BasicModal: React.FC<BasicModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default BasicModal;