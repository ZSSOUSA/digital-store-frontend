import Layout from "../Layout/Layout";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import "./productListingPage.css";

import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { searchProducts } from "../../services/productService";

import fallbackImg from "../../assets/logo.svg";

const API_BASE_URL = "http://localhost:3000";

export default function ProductListingPage() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const filter = (params.get("filter") || "").trim();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilter, setPriceFilter] = useState("");

  // Carregar produtos da API
  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const result = await searchProducts({ filter, limit: 100, page: 1 });

        if (!mounted) return;
        setProducts(result.data || []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [filter]);

  // Filtrar e ordenar produtos
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Aplicar filtro de preço
    if (priceFilter) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        
        if (priceFilter === "0-50") return price <= 50;
        if (priceFilter === "50-100") return price > 50 && price <= 100;
        if (priceFilter === "100-200") return price > 100 && price <= 200;
        if (priceFilter === "200+") return price > 200;
        
        return true;
      });
    }

    //  ordenação
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, priceFilter, sortOrder]);

  
  const productsList = filteredAndSortedProducts.map((p) => ({
    name: p.name,
    image: p.images?.[0]?.path ? `${API_BASE_URL}${p.images[0].path}` : fallbackImg,
    price: p.price,
    priceDiscount: p.price_with_discount ?? p.price,
    to: `/product/${p.id}`,
  }));

  const priceFilterOptions = [
    { text: "Até R$ 50", value: "0-50" },
    { text: "R$ 50 a R$ 100", value: "50-100" },
    { text: "R$ 100 a R$ 200", value: "100-200" },
    { text: "Acima de R$ 200", value: "200+" },
  ];

  return (
    <Layout>
      <div className="productListingPageContainer">
        <div className="productListingPageContent">
          {/* Sidebar com filtros e ordenação */}
          <aside className="productListingSidebar">
            
            <div className="productListingSort">
              <label className="productListingSortLabel">Ordenar por</label>
              <select
                className="productListingSortSelect"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Menor preço</option>
                <option value="desc">Maior preço</option>
              </select>
            </div>

         
            <FilterGroup
              title="Preço"
              inputType="radio"
              options={priceFilterOptions}
              onChange={(selectedValue) => setPriceFilter(selectedValue)}
            />
          </aside>

          {/* Conteúdo principal com produtos */}
          <div className="productListingMain">
            {loading ? (
              <div className="productListingEmpty">Carregando produtos...</div>
            ) : productsList.length > 0 ? (
              <Section 
                title={`${productsList.length} produtos encontrados`}
                titleAlign="left"
              >
                <ProductListing products={productsList} />
              </Section>
            ) : (
              <div className="productListingEmpty">
                Nenhum produto encontrado com o filtro "{filter}"
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
