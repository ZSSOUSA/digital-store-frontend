import "./buyBox.css";
import starIcon from "../../assets/star-icon.svg";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

export default function BuyBox({
  id,
  name,
  reference,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
}) {
  const { addToCart } = useContext(CartContext);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: id || reference,
      name,
      price,
      priceDiscount: priceDiscount || price,
      image: null,
    });

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const hasDiscount = priceDiscount && priceDiscount < price;

  return (
    <div className="buyBox">
      <h1 className="buyBoxName">{name}</h1>

      <div className="buyBoxMeta">
        {reference && <span className="buyBoxReference">Ref: {reference}</span>}

        {stars !== undefined && (
          <div className="buyBoxRating">
            <span className="buyBoxStars">
              <img src={starIcon} alt="Estrela" />
              {stars}
            </span>
            {rating && <span className="buyBoxRatingCount">({rating} avaliações)</span>}
          </div>
        )}
      </div>

      {/* Preços */}
      <div className="buyBoxPrices">
        {hasDiscount ? (
          <>
            <span className="buyBoxPriceOld">R$ {price.toFixed(2)}</span>
            <span className="buyBoxPrice">R$ {priceDiscount.toFixed(2)}</span>
          </>
        ) : (
          <span className="buyBoxPrice">R$ {price.toFixed(2)}</span>
        )}
      </div>

      {/* Descrição */}
      {description && <p className="buyBoxDescription">{description}</p>}

      {/* Opções (ProductOptions ou outros filhos) */}
      {children && <div className="buyBoxOptions">{children}</div>}

      {/* Botão Comprar */}
      <button 
        className={`buyBoxButton ${addedToCart ? 'added' : ''}`}
        onClick={handleAddToCart}
      >
        {addedToCart ? '✓ Adicionado ao carrinho!' : 'Comprar'}
      </button>
    </div>
  );
}
