import Layout from "../Layout/Layout";
import Section from "../../components/Section/Section";
import ProductListing from "../../components/ProductListing/ProductListing";
import Gallery from "../../components/Gallery/Gallery";
import "./collections.css";

const API_BASE_URL = "http://localhost:3000";

export default function HomePage() {
  // Slide de imagens
  const slideImages = [
    { src: `${API_BASE_URL}/images/home-slide-1.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-2.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-3.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-4.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-5.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-6.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-7.jpeg` },
    { src: `${API_BASE_URL}/images/home-slide-8.jpeg` },
  ];

  // Produtos em alta
  const topProducts = [
    {
      name: "Produto 1",
      image: `${API_BASE_URL}/images/product-thumb-1.jpeg`,
      price: 199.9,
      priceDiscount: 149.9,
    },
    {
      name: "Produto 2",
      image: `${API_BASE_URL}/images/product-thumb-2.jpeg`,
      price: 299.9,
      priceDiscount: 199.9,
    },
    {
      name: "Produto 3",
      image: `${API_BASE_URL}/images/product-thumb-3.jpeg`,
      price: 149.9,
    },
    {
      name: "Produto 4",
      image: `${API_BASE_URL}/images/product-thumb-4.jpeg`,
      price: 89.9,
      priceDiscount: 69.9,
    },
    {
      name: "Produto 5",
      image: `${API_BASE_URL}/images/product-thumb-5.jpeg`,
      price: 199.9,
      priceDiscount: 159.9,
    },
    {
      name: "Produto 1",
      image: `${API_BASE_URL}/images/product-thumb-1.jpeg`,
      price: 197.9,
      priceDiscount: 149.9,
    },
    {
      name: "Produto 2",
      image: `${API_BASE_URL}/images/product-thumb-2.jpeg`,
      price: 299.9,
      priceDiscount: 199.9,
    },
    {
      name: "Produto 3",
      image: `${API_BASE_URL}/images/product-thumb-3.jpeg`,
      price: 149.9,
    },
  ];

  return (
    <Layout>
      {/* Slide de imagens */}
      <div style={{ padding: "24px" }}>
        <Gallery
          images={slideImages}
          width={1440}
          height={681}
          radius="4px"
          showThumbs
        />
      </div>

      {/* Coleções em destaque */}
      <Section title="Coleções em destaque" titleAlign="center">
        <div className="collectionsGrid">
          <div className="collectionCard">
            <img src={`${API_BASE_URL}/images/collection-1.png`} alt="Coleção 1" />
          </div>
          <div className="collectionCard">
            <img src={`${API_BASE_URL}/images/collection-2.png`} alt="Coleção 2" />
          </div>
          <div className="collectionCard">
            <img src={`${API_BASE_URL}/images/collection-3.png`} alt="Coleção 3" />
          </div>
        </div>
      </Section>

      {/* Produtos em alta */}
      <Section
        title="Produtos em alta"
        titleAlign="left"
        link={{ text: "Ver todos", href: "/produtos" }}
      >
        <ProductListing products={topProducts} />
      </Section>
    </Layout>
  );
}
