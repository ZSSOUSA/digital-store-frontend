import { useState } from "react";
import "./productOptions.css";

export default function ProductOptions({ options = [], shape = "square", radius = "4px", type = "text" }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const isCircle = shape === "circle";
  const isColor = type === "color";

  return (
    <div className="productOptions">
      <div
        className={`productOptionsContainer productOptionsShape--${shape}`}
        style={isCircle ? {} : { "--product-options-radius": radius }}
      >
        {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const optionStyle = isColor ? { backgroundColor: option } : {};

          return (
            <button
              key={index}
              className={`productOption ${isSelected ? "selected" : ""}`}
              onClick={() => setSelectedOption(option)}
              style={optionStyle}
              title={!isColor ? option : ""}
            >
              {!isColor && <span className="productOptionText">{option}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
