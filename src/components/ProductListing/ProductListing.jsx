import ProductCard from "../ProductCard/ProductCard";
import "./productListing.css";

export default function ProductListing({ products, children }) {
  // Se receber products como prop, renderiza cards
  if (products && Array.isArray(products)) {
    return (
      <div className="productGrid">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            image={product.image}
            name={product.name}
            price={product.price}
            priceDiscount={product.priceDiscount}
            to={product.to}
          />
        ))}
      </div>
    );
  }

  // Caso contrário, funciona como wrapper (retrocompatibilidade)
  return <div className="productGrid">{children}</div>;
}
