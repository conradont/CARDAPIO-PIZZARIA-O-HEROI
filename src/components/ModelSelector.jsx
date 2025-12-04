import React from 'react';
import modelsList from '../models.json';
import './ModelSelector.css';

function ModelSelector({ selectedModel, onModelSelect }) {
  return (
    <div className="model-selector">
      <h3>Selecionar Modelo</h3>
      <div className="model-grid">
        {modelsList.models.map((model) => (
          <div
            key={model.name}
            className={`model-card ${selectedModel === model.name ? 'selected' : ''}`}
            onClick={() => onModelSelect(model.name)}
          >
            <div className="model-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div className="model-info">
              <h4>{model.displayName || model.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
              <p>{model.file}</p>
            </div>
            {selectedModel === model.name && (
              <div className="selected-indicator">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelSelector;
