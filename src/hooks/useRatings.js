import { useState, useEffect, useCallback } from 'react';
import { saveRating, getAllRatings, calculateAverageRating } from '../services/ratingsService';

/**
 * Hook personalizado para gerenciar avaliações com Firebase
 */
export const useRatings = () => {
  const [ratings, setRatings] = useState({
    bolo_cenoura: 0,
    torta_doce: 0,
    prato_cuscuz: 0,
    bomba: 0
  });
  
  const [productRatings, setProductRatings] = useState({
    bolo_cenoura: [],
    torta_doce: [],
    prato_cuscuz: [],
    bomba: []
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar avaliações do Firebase
  const loadRatings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allRatings = await getAllRatings();
      setProductRatings(allRatings);
      
      // Calcular médias para cada produto
      const newRatings = {};
      Object.keys(allRatings).forEach(productId => {
        newRatings[productId] = calculateAverageRating(allRatings[productId]);
      });
      setRatings(newRatings);
      
      console.log('✅ Avaliações carregadas do Firebase');
    } catch (err) {
      console.error('❌ Erro ao carregar avaliações:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar avaliações quando o componente montar
  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  // Adicionar nova avaliação
  const addRating = useCallback(async (productId, rating) => {
    try {
      // Salvar no Firebase
      await saveRating(productId, rating);
      
      // Atualizar estado local
      const updatedProductRatings = {
        ...productRatings,
        [productId]: [...(productRatings[productId] || []), rating]
      };
      setProductRatings(updatedProductRatings);
      
      // Recalcular média
      const productRatingsList = updatedProductRatings[productId];
      const newAverage = calculateAverageRating(productRatingsList);
      
      setRatings(prev => ({
        ...prev,
        [productId]: newAverage
      }));
      
      console.log('✅ Avaliação adicionada com sucesso');
      return true;
    } catch (err) {
      console.error('❌ Erro ao adicionar avaliação:', err);
      setError(err);
      return false;
    }
  }, [productRatings]);

  return {
    ratings,
    productRatings,
    loading,
    error,
    addRating,
    loadRatings
  };
};


