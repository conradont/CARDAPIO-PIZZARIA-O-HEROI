import React from 'react';
import ModelViewer from './ModelViewer';
import './Modal3D.css';

function Modal3D({ isOpen, onClose, modelPath, productName }) {
  if (!isOpen || !modelPath) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div className="modal-header">
          <h2>{productName}</h2>
        </div>
        <div className="modal-viewer">
          <ModelViewer selectedModel={modelPath} />
        </div>
        <div className="modal-info">
          <p>Arraste para rotacionar • Scroll para zoom</p>
        </div>
      </div>
    </div>
  );
}

export default Modal3D;

