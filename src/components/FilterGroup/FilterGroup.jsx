import "./filterGroup.css";

import { useId } from "react";

export default function FilterGroup({
  title,
  inputType = "checkbox",
  options = [],
  onChange,
  name,
  value,
}) {
  const autoId = useId();
  const groupName = name || `filter-${autoId}`;

  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="filterGroup">
      <h3 className="filterGroupTitle">{title}</h3>
      <div className="filterGroupDivider" />
      
      <div className="filterGroupOptions">
        {options.map((option, index) => (
          (() => {
            const optionValue = option.value || option.text;
            const checked = inputType === "radio" ? value === optionValue : undefined;

            return (
          <label key={index} className="filterGroupLabel">
            <input
              type={inputType}
              name={inputType === "radio" ? groupName : undefined}
              value={optionValue}
              checked={checked}
              onChange={(e) => handleChange(e.target.value)}
              className="filterGroupInput"
            />
            <span className="filterGroupText">{option.text}</span>
          </label>
            );
          })()
        ))}
      </div>
    </div>
  );
}
