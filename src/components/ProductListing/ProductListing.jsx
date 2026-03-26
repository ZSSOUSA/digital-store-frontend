import ProductCard from "../ProductCard/ProductCard";
import "./productListing.css";

export default function ProductListing({ products, children }) {
  // Se receber products como prop, renderiza cards
  if (products && Array.isArray(products)) {
    return (
      <ul className="productGrid">
        {products.map((product, index) => (
          <li key={index}>
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              priceDiscount={product.priceDiscount}
              to={product.to}
            />
          </li>
        ))}
      </ul>
    );
  }

  // Caso contrário, funciona como wrapper (retrocompatibilidade)
  return <ul className="productGrid">{children}</ul>;
}
