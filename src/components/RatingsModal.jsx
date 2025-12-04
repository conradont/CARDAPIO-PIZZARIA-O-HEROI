import React from 'react';
import './RatingsModal.css';

function RatingsModal({ isOpen, onClose, productName, ratings, onOpenRatingForm }) {
  if (!isOpen) return null;

  return (
    <div className="ratings-modal-overlay" onClick={onClose}>
      <div className="ratings-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="ratings-modal-close" onClick={onClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div className="ratings-modal-header">
          <h2>Avaliações - {productName}</h2>
        </div>
        <div className="ratings-modal-body">
          {ratings && ratings.length > 0 ? (
            <div className="ratings-list">
              {ratings.map((rating, index) => (
                <div key={index} className="rating-item">
                  <div className="rating-header">
                    <div className="rating-author">
                      <div className="author-avatar">
                        {rating.author ? rating.author.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="author-info">
                        <div className="author-name">{rating.author || 'Usuário Anônimo'}</div>
                        <div className="rating-date">{rating.date || 'Data não disponível'}</div>
                      </div>
                    </div>
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={star <= rating.stars ? "#FFD700" : "#ddd"}
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  {rating.comment && (
                    <div className="rating-comment">
                      {rating.comment}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-ratings">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <p>Nenhuma avaliação ainda</p>
              <p className="no-ratings-subtitle">Seja o primeiro a avaliar este produto!</p>
            </div>
          )}
        </div>
        <button className="add-rating-btn" onClick={onOpenRatingForm}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Avaliar
        </button>
      </div>
    </div>
  );
}

export default RatingsModal;

