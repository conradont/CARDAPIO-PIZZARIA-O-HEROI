// Serviço para gerenciar avaliações no Firebase
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Salvar uma nova avaliação no Firebase
 * @param {string} productId - ID do produto
 * @param {object} rating - Objeto com os dados da avaliação
 */
export const saveRating = async (productId, rating) => {
  try {
    const ratingWithProduct = {
      ...rating,
      productId: productId,
      timestamp: new Date().toISOString() // Adicionar timestamp para ordenação
    };
    
    const docRef = await addDoc(collection(db, 'ratings'), ratingWithProduct);
    console.log('✅ Avaliação salva com sucesso! ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Erro ao salvar avaliação:', error);
    throw error;
  }
};

/**
 * Buscar todas as avaliações de um produto
 * @param {string} productId - ID do produto
 * @returns {Promise<Array>} Lista de avaliações
 */
export const getRatingsByProduct = async (productId) => {
  try {
    const ratingsRef = collection(db, 'ratings');
    const q = query(
      ratingsRef, 
      where('productId', '==', productId),
      orderBy('timestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const ratings = [];
    
    querySnapshot.forEach((doc) => {
      ratings.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`✅ ${ratings.length} avaliações encontradas para ${productId}`);
    return ratings;
  } catch (error) {
    console.error('❌ Erro ao buscar avaliações:', error);
    throw error;
  }
};

/**
 * Buscar todas as avaliações de todos os produtos
 * @returns {Promise<object>} Objeto com avaliações agrupadas por produto
 */
export const getAllRatings = async () => {
  try {
    const ratingsRef = collection(db, 'ratings');
    const querySnapshot = await getDocs(ratingsRef);
    
    const ratingsByProduct = {
      bolo_cenoura: [],
      torta_doce: [],
      prato_cuscuz: [],
      bomba: []
    };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (ratingsByProduct[data.productId]) {
        ratingsByProduct[data.productId].push({
          id: doc.id,
          ...data
        });
      }
    });
    
    // Ordenar por timestamp em ordem decrescente para cada produto
    Object.keys(ratingsByProduct).forEach(productId => {
      ratingsByProduct[productId].sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    });
    
    console.log('✅ Todas as avaliações carregadas');
    return ratingsByProduct;
  } catch (error) {
    console.error('❌ Erro ao buscar todas as avaliações:', error);
    throw error;
  }
};

/**
 * Calcular a média de avaliações de um produto
 * @param {Array} ratings - Lista de avaliações
 * @returns {number} Média arredondada para 1 casa decimal
 */
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0;
  
  const sum = ratings.reduce((acc, rating) => acc + rating.stars, 0);
  const average = sum / ratings.length;
  return Math.round(average * 10) / 10;
};


