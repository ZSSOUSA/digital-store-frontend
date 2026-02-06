import { Link } from "react-router-dom";
import "./productCard.css";
import { useState } from "react";

export default function ProductCard({ image, name, price, priceDiscount, to }) {
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    setImageSrc("https://via.placeholder.com/292x321?text=Imagem+Indispon%C3%ADvel");
  };

  const content = (
    <>
      <div className="productImageBox">
        <img src={imageSrc} alt={name} className="productImage" onError={handleImageError} />
      </div>

      <div className="productInfo">
        <p className="productName">{name}</p>

        {priceDiscount ? (
          <div className="productPriceRow">
            <span className="priceOld">R$ {Number(price).toFixed(2)}</span>
            <span className="priceNew">R$ {Number(priceDiscount).toFixed(2)}</span>
          </div>
        ) : (
          <p className="productPrice">R$ {Number(price).toFixed(2)}</p>
        )}
      </div>
    </>
  );

  return to ? (
    <Link to={to} className="productCardLink">
      <div className="productCard">{content}</div>
    </Link>
  ) : (
    <div className="productCard">{content}</div>
  );
}
