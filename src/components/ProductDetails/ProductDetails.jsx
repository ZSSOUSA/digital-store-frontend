import "./productDetails.css";

export default function ProductDetails({ product }) {
  if (!product) return null;

  return (
    <div className="productDetails">
      <div className="productDetailsImage">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="productDetailsInfo">
        <h1>{product.name}</h1>

        <div className="productDetailsPrices">
          <span className="oldPrice">R$ {product.price.toFixed(2)}</span>
          <span className="newPrice">R$ {product.priceDiscount.toFixed(2)}</span>
        </div>

        <p className="productDetailsDesc">{product.description}</p>
      </div>
    </div>
  );
}
