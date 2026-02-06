import Layout from "../Layout/Layout";
import Gallery from "../../components/Gallery/Gallery";
import BuyBox from "../../components/BuyBox/BuyBox";
import ProductOptions from "../../components/ProductOptions/ProductOptions";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import "./productViewPage.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { getProductById } from "../../services/productService";
import fallbackImg from "../../assets/logo.svg";

const API_BASE_URL = "http://localhost:3000";

export default function ProductViewPage() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await getProductById(id);

        if (!mounted) return;

        // Estruturar dados do produto
        const images = data.images
          ? data.images.map((img) => ({
              src: img.path ? `${API_BASE_URL}${img.path}` : fallbackImg,
            }))
          : [{ src: fallbackImg }];

        setProduct({
          ...data,
          images,
          priceDiscount: data.price_with_discount ?? data.price,
        });
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  // Produtos recomendados 
  const recommendedProducts = [
    {
      name: "Produto Recomendado 1",
      image: `${API_BASE_URL}/images/product-thumb-1.jpeg`,
      price: 199.9,
      priceDiscount: 149.9,
    },
    {
      name: "Produto Recomendado 2",
      image: `${API_BASE_URL}/images/product-thumb-2.jpeg`,
      price: 299.9,
      priceDiscount: 199.9,
    },
    {
      name: "Produto Recomendado 3",
      image: `${API_BASE_URL}/images/product-thumb-3.jpeg`,
      price: 149.9,
    },
    {
      name: "Produto Recomendado 4",
      image: `${API_BASE_URL}/images/product-thumb-4.jpeg`,
      price: 89.9,
      priceDiscount: 69.9,
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="productViewPageLoading">Carregando produto...</div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="productViewPageEmpty">Produto não encontrado</div>
      </Layout>
    );
  }

  return (
    <Layout>
      
      <div className="productViewPageContainer">
        <div className="productViewPageContent">
          
          <div className="productViewPageGallery">
            <Gallery
              images={product.images}
              width={700}
              height={570}
              radius="4px"
              showThumbs
            />
          </div>

          
          <div className="productViewPageBuyBox">
            <BuyBox
              id={product.id}
              name={product.name}
              reference={product.id}
              stars={4.5}
              rating={128}
              price={product.price}
              priceDiscount={product.priceDiscount}
              description={product.description}
            >
             
              {product.options && product.options.length > 0 && (
                <div>
                  {product.options.map((option) => (
                    <div key={option.id} style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600" }}>
                        {option.title}
                      </label>
                      <ProductOptions
                        options={option.values.split(",")}
                        shape={option.shape}
                        radius={option.radius ? `${option.radius}px` : "4px"}
                        type={option.type}
                      />
                    </div>
                  ))}
                </div>
              )}
            </BuyBox>
          </div>
        </div>

       
        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: "Ver todos", href: "/produtos" }}
        >
          <ProductListing products={recommendedProducts} />
        </Section>
      </div>
    </Layout>
  );
}
