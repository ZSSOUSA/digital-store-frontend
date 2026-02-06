import { Link } from "react-router-dom";
import "./footerInfo.css";

export default function FooterInfo({ title, informations }) {
  return (
    <div className="footerInfo">
      <h3 className="footerInfoTitle">{title}</h3>
      <ul className="footerInfoList">
        {informations.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
