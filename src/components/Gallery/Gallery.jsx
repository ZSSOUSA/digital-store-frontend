import { useState } from "react";
import "./gallery.css";
import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";

export default function Gallery({
  images = [],
  width = "auto",
  height = "auto",
  radius = "0px",
  showThumbs = false,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < images.length - 1;

  const goToPrevious = () => {
    if (canGoLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (canGoRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];
  const widthUnit = `${width}${typeof width === "string" ? "" : "px"}`;
  const heightUnit = `${height}${typeof height === "string" ? "" : "px"}`;

  return (
    <div className={`gallery ${className}`}>
      {/* Slide Principal */}
      <div
        className="galleryMainSlide"
        style={{
          width: widthUnit,
          height: heightUnit,
        }}
      >
        <img
          src={currentImage.src}
          alt={`Slide ${currentIndex + 1}`}
          className="galleryMainImage"
          style={{
            borderRadius: radius,
          }}
        />

        {/* Seta Esquerda */}
        <button
          className={`galleryArrow galleryArrowLeft ${!canGoLeft ? "disabled" : ""}`}
          onClick={goToPrevious}
          disabled={!canGoLeft}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="Anterior" />
        </button>

        {/* Seta Direita */}
        <button
          className={`galleryArrow galleryArrowRight ${!canGoRight ? "disabled" : ""}`}
          onClick={goToNext}
          disabled={!canGoRight}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="Próxima" />
        </button>
      </div>

      {/* Thumbnails */}
      {showThumbs && (
        <div className="galleryThumbs">
          {images.map((image, index) => (
            <button
              key={index}
              className={`galleryThumb ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToImage(index)}
              style={{
                borderRadius: radius,
                borderColor: index === currentIndex ? "var(--primary)" : "transparent",
              }}
              aria-label={`Ir para imagem ${index + 1}`}
            >
              <img
                src={image.src}
                alt={`Miniatura ${index + 1}`}
                style={{
                  borderRadius: radius,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
