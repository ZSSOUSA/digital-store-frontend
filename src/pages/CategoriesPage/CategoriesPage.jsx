import Layout from "../Layout/Layout";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import "./categoriesPage.css";

import { useEffect, useState } from "react";
import { api } from "../../services/api";

import fallbackImg from "../../assets/logo.svg";

const API_BASE_URL = process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL.replace('/v1', '') 
  : "http://localhost:3000";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const response = await api.get("/category/search", {
          params: { limit: 100, page: 1, use_in_menu: true },
        });

        if (!mounted) return;
        setCategories(response.data.data || []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setCategories([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  
  useEffect(() => {
    if (!selectedCategory) return;

    let mounted = true;

    async function loadProducts() {
      try {
        setLoadingProducts(true);
        const response = await api.get("/product/search", {
          params: {
            limit: 100,
            page: 1,
            category_ids: selectedCategory.id,
          },
        });

        if (!mounted) return;
        const productsData = response.data.data || [];
        
      
        const productsList = productsData.map((p) => ({
          name: p.name,
          image: p.images?.[0]?.path ? `${API_BASE_URL}${p.images[0].path}` : fallbackImg,
          price: p.price,
          priceDiscount: p.price_with_discount ?? p.price,
          to: `/product/${p.id}`,
        }));

        setProducts(productsList);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setProducts([]);
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    }

    loadProducts();
    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  if (loading) {
    return (
      <Layout>
        <div className="categoriesPageContainer">
          <div className="categoriesLoadingMessage">Carregando categorias...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="categoriesPageContainer">
        {/* Lista de Categorias */}
        <div className="categoriesListSection">
          <h2 className="categoriesTitle">Categorias</h2>
          <div className="categoriesList">
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`categoryItem ${
                    selectedCategory?.id === category.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div className="categoriesEmpty">Nenhuma categoria encontrada</div>
            )}
          </div>
        </div>

        {/* Produtos da Categoria Selecionada */}
        {selectedCategory && (
          <div className="categoriesProductsSection">
            {loadingProducts ? (
              <div className="categoriesLoadingMessage">
                Carregando produtos de {selectedCategory.name}...
              </div>
            ) : products.length > 0 ? (
              <Section
                title={`${products.length} produtos em ${selectedCategory.name}`}
                titleAlign="left"
              >
                <ProductListing products={products} />
              </Section>
            ) : (
              <div className="categoriesEmpty">
                Nenhum produto encontrado em {selectedCategory.name}
              </div>
            )}
          </div>
        )}
        
        {!selectedCategory && categories.length > 0 && (
          <div className="categoriesSelectMessage">
            <p>Selecione uma categoria para ver os produtos disponíveis</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
