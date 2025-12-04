import React, { useState } from 'react';
import './RatingForm.css';

function RatingForm({ isOpen, onClose, productName, onSubmit }) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (rating === 0) {
      newErrors.rating = 'Selecione uma nota';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Criar objeto de avaliação
    const newRating = {
      author: name,
      stars: rating,
      date: new Date().toLocaleDateString('pt-BR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      comment: comment.trim() || null
    };
    
    // Chamar callback de submit
    onSubmit(newRating);
    
    // Limpar formulário
    setName('');
    setRating(0);
    setHoverRating(0);
    setComment('');
    setErrors({});
    
    // Fechar modal
    onClose();
  };

  const handleClose = () => {
    // Limpar formulário ao fechar
    setName('');
    setRating(0);
    setHoverRating(0);
    setComment('');
    setErrors({});
    onClose();
  };

  return (
    <div className="rating-form-overlay" onClick={handleClose}>
      <div className="rating-form-content" onClick={(e) => e.stopPropagation()}>
        <button className="rating-form-close" onClick={handleClose}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="rating-form-header">
          <h2>Avaliar - {productName}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="rating-form">
          <div className="form-group">
            <label htmlFor="name">Nome *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label>Nota *</label>
            <div className="stars-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-btn"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill={star <= (hoverRating || rating) ? "#FFD700" : "#ddd"}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </button>
              ))}
            </div>
            {errors.rating && <span className="error-message">{errors.rating}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Feedback (opcional)</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Deixe um comentário sobre o produto..."
              rows="4"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-btn">
              Enviar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RatingForm;



