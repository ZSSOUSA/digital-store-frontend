import "./filterGroup.css";

export default function FilterGroup({ title, inputType = "checkbox", options = [], onChange }) {
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
          <label key={index} className="filterGroupLabel">
            <input
              type={inputType}
              value={option.value || option.text}
              onChange={(e) => handleChange(e.target.value)}
              className="filterGroupInput"
            />
            <span className="filterGroupText">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
