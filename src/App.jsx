import React, { useState } from "react";
import ModelViewer from "./components/ModelViewer";
import Modal3D from "./components/Modal3D";
import RatingsModal from "./components/RatingsModal";
import RatingForm from "./components/RatingForm";
import { useRatings } from "./hooks/useRatings";
import { useModelPreloader } from "./hooks/useModelPreloader";
import "./App.css";

// Componente para renderizar imagem com fallback
function ProductImage({ src, alt }) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          color: "#999",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <path d="M9 9h6v6H9z" />
        </svg>
        <span style={{ fontSize: "14px" }}>Imagem não encontrada</span>
      </div>
    );
  }

  return <img src={src} alt={alt} onError={() => setImgError(true)} />;
}

function App() {
  // Usar o hook useRatings para gerenciar avaliações com Firebase
  const { ratings, productRatings, addRating, loading } = useRatings();

  const [selectedModel, setSelectedModel] = useState("/super_burguer.glb");
  const [selectedModelName, setSelectedModelName] = useState("Super_Burguer");

  // Pré-carregar modelos em segundo plano para carregamento mais rápido
  useModelPreloader(selectedModel);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalModel, setModalModel] = useState(null);
  const [modalProductName, setModalProductName] = useState("");
  const [ratingsModalOpen, setRatingsModalOpen] = useState(false);
  const [selectedProductRatings, setSelectedProductRatings] = useState([]);
  const [selectedProductNameForRatings, setSelectedProductNameForRatings] =
    useState("");
  const [selectedProductIdForRatings, setSelectedProductIdForRatings] =
    useState("");

  // Estado para o formulário de avaliação
  const [ratingFormOpen, setRatingFormOpen] = useState(false);

  // Dados dos produtos com informações completas (apenas hambúrgueres)
  const products = [
    {
      id: "Super_Burguer",
      name: "Super_Burguer",
      nameDisplay: "Super Burguer",
      image: "/super_burguer.glb",
      imageUrl: "/super_burguer.png",
      category: "hamburgueres",
      price: 19.0,
      description:
        "É a engenharia do sabor com pão brioche, blend nobre e molho secreto. A essência do que um hambúrguer deve ser.",
      ingredients:
        "Pão brioche, blend bovino, tomate, alface, queijo, molho especial",
    },
    {
      id: "Quarteto_Fantastico",
      name: "Quarteto_Fantastico",
      nameDisplay: "Quarteto Fantástico",
      image: "/quarteto_fantastico.glb",
      imageUrl: "/quarteto_fantastico.png",
      category: "hamburgueres",
      price: 25.0,
      description:
        "O combo épico com quatro deliciosos sabores em um só hambúrguer.",
      ingredients:
        "Pão, carne, queijo, bacon, cebola caramelisada  , molhos especiais",
    },
    {
      id: "Duplo_Cheddar_Bacon",
      name: "Duplo_Cheddar_Bacon",
      nameDisplay: "Duplo Cheddar Bacon",
      image: "/Duplo_Cheddar_Bacon.glb",
      imageUrl: "/Duplo_Cheddar_Bacon.png",
      category: "hamburgueres",
      price: 22.0,
      description:
        "O sabor intenso do cheddar duplo combinado com bacon crocante. Uma explosão de sabores em cada mordida.",
      ingredients:
        "Pão brioche, dois hambúrgueres, cheddar duplo, bacon crocante, cebola, molho especial",
    },
    {
      id: "X_Frango",
      name: "X_Frango",
      nameDisplay: "X Frango",
      image: "/X_Frango.glb",
      imageUrl: "/X_Frango.png",
      category: "hamburgueres",
      price: 15.0,
      description:
        "Frango grelhado suculento com ingredientes frescos. A opção perfeita para quem busca sabor e qualidade.",
      ingredients:
        "Pão brioche, frango grelhado, queijo, alface, tomate, maionese especial",
    },
    {
      id: "X_Bacon",
      name: "X_Bacon",
      nameDisplay: "X Bacon",
      image: "/X_Bacon.glb",
      imageUrl: "/X_Bacon.png",
      category: "hamburgueres",
      price: 15.0,
      description:
        "O clássico hambúrguer com bacon crocante e queijo derretido. Sabor tradicional que nunca sai de moda.",
      ingredients:
        "Pão brioche, hambúrguer bovino, queijo, bacon crocante, alface, tomate, maionese",
    },
    {
      id: "X_Calabresa",
      name: "X_Calabresa",
      nameDisplay: "X Calabresa",
      image: "/X_Calabresa.glb",
      imageUrl: "/X_Clalabresa.png",
      category: "hamburgueres",
      price: 15.0,
      description:
        "Hambúrguer com calabresa fatiada, queijo e molho especial. Um sabor picante e irresistível.",
      ingredients:
        "Pão brioche, hambúrguer bovino, calabresa fatiada, queijo, cebola, molho especial",
    },
    {
      id: "X_Presunto",
      name: "X_Presunto",
      nameDisplay: "X Presunto",
      image: "/X_Presunto.glb",
      imageUrl: "/X_Presunto.png",
      category: "hamburgueres",
      price: 15.0,
      description:
        "Hambúrguer clássico com presunto suculento e queijo derretido. Simplicidade e sabor em cada mordida.",
      ingredients:
        "Pão brioche, hambúrguer bovino, presunto, queijo, alface, tomate, maionese",
    },
    {
      id: "X_Egg",
      name: "X_Egg",
      nameDisplay: "X Egg",
      image: "/X_Egg.glb",
      imageUrl: "/X_Egg.png",
      category: "hamburgueres",
      price: 15.0,
      description:
        "Hambúrguer com ovo frito, queijo e ingredientes frescos. O toque especial que faz toda a diferença.",
      ingredients:
        "Pão brioche, hambúrguer bovino, ovo frito, queijo, alface, tomate, maionese",
    },
    {
      id: "X_Burguer",
      name: "X_Burguer",
      nameDisplay: "X Burguer",
      image: "/X_Burguer.glb",
      imageUrl: "/X_Burguer.png",
      category: "hamburgueres",
      price: 12.0,
      description:
        "O hambúrguer clássico com queijo derretido e ingredientes frescos. Simplicidade e sabor autêntico.",
      ingredients:
        "Pão brioche, hambúrguer bovino, queijo, alface, tomate, maionese",
    },
    {
      id: "Autobot",
      name: "Autobot",
      nameDisplay: "Autobot",
      image: "/Autobot.glb",
      imageUrl: "/Autobot.png",
      category: "hamburgueres",
      price: 20.0,
      description:
        "O hambúrguer transformado em uma experiência épica. Sabor e tecnologia em cada mordida.",
      ingredients:
        "Pão especial, blend premium, queijos especiais, ingredientes selecionados, molho exclusivo",
    },
  ];

  const handleModelSelect = (modelName) => {
    const product = products.find((p) => p.name === modelName);
    if (product) {
      setSelectedModel(product.image);
      setSelectedModelName(product.name);
    }
  };

  const handleOpenModal = (product) => {
    setModalModel(product.image);
    setModalProductName(product.nameDisplay);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenRatingsModal = (product) => {
    setSelectedProductRatings(productRatings[product.id] || []);
    setSelectedProductNameForRatings(product.nameDisplay);
    setSelectedProductIdForRatings(product.id);
    setRatingsModalOpen(true);
  };

  const handleCloseRatingsModal = () => {
    setRatingsModalOpen(false);
  };

  const handleOpenRatingForm = () => {
    setRatingFormOpen(true);
  };

  const handleCloseRatingForm = () => {
    setRatingFormOpen(false);
  };

  const handleSubmitRating = async (newRating) => {
    // Usar o addRating do hook para salvar no Firebase
    const success = await addRating(selectedProductIdForRatings, newRating);

    if (success) {
      // Atualizar a lista de avaliações no modal
      setSelectedProductRatings((prev) => [...prev, newRating]);
      console.log("✅ Avaliação enviada com sucesso!");
    } else {
      console.error("❌ Erro ao enviar avaliação");
    }
  };

  const categories = [
    { id: "all", name: "Todos" },
    { id: "hamburgueres", name: "Hambúrgueres" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="app">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-image">
          <ProductImage src="/banner.png" alt="O Herói" />
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="restaurant-info">
        <div className="logo-placeholder">
          <img
            src="/logo_oheroi.png"
            alt="O Herói Pizzaria"
            className="logo-img"
          />
        </div>
        <h1 className="restaurant-name">O HERÓI HAMBÚRGUERES</h1>
      </div>

      {/* Category Menu */}
      <div className="category-menu">
        <div className="category-list">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${
                selectedCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <main className="products-section">
        <div className="section-header">
          <h2>
            {selectedCategory === "all"
              ? "Produtos em Destaque"
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`product-card ${
                selectedModelName === product.name ? "selected" : ""
              }`}
              onClick={() => handleModelSelect(product.name)}
            >
              <div className="product-image">
                <ProductImage
                  src={product.imageUrl}
                  alt={product.nameDisplay}
                />
                <button
                  className="view-3d-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenModal(product);
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  Ver 3D
                </button>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.nameDisplay}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-rating">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = ratings[product.id];
                      const fillPercentage =
                        rating > 0
                          ? Math.max(
                              0,
                              Math.min(100, ((rating - (star - 1)) / 1) * 100)
                            )
                          : 0;

                      return (
                        <div key={star} className="star-container">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="#ddd"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14git.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                          {rating > 0 && (
                            <svg
                              className="star-fill"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="#FFD700"
                              style={{
                                clipPath: `inset(0 ${
                                  100 - fillPercentage
                                }% 0 0)`,
                              }}
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="rate-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenRatingsModal(product);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    Avaliações
                  </button>
                </div>
                <div className="product-footer">
                  <span className="product-price">
                    R$ {product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal 3D */}
      <Modal3D
        isOpen={modalOpen}
        onClose={handleCloseModal}
        modelPath={modalModel}
        productName={modalProductName}
      />

      {/* Modal de Avaliações */}
      <RatingsModal
        isOpen={ratingsModalOpen}
        onClose={handleCloseRatingsModal}
        productName={selectedProductNameForRatings}
        ratings={selectedProductRatings}
        onOpenRatingForm={handleOpenRatingForm}
      />

      {/* Formulário de Avaliação */}
      <RatingForm
        isOpen={ratingFormOpen}
        onClose={handleCloseRatingForm}
        productName={selectedProductNameForRatings}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}

export default App;
