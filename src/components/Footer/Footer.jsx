import "./footer.css";
import FooterInfo from "../FooterInfo/FooterInfo";

import logoFooter from "../../assets/logo-footer.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import twitter from "../../assets/twitter.svg";

const aboutLinks = [
  { text: "Sobre a Drip Store", link: "/about" },
  { text: "Contato", link: "/contact" },
  { text: "Políticas", link: "/policies" },
];

const supportLinks = [
  { text: "Dúvidas Frequentes", link: "/faq" },
  { text: "Rastreamento", link: "/tracking" },
  { text: "Devoluções", link: "/returns" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerBrand">
          <img src={logoFooter} alt="Digital Store" className="footerLogo" />
          <p className="footerText">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="socialIcons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitter} alt="Twitter" />
            </a>
          </div>
        </div>

        <FooterInfo title="Sobre" informations={aboutLinks} />
        <FooterInfo title="Suporte" informations={supportLinks} />
      </div>

      <hr className="footerDivider" />

      <div className="footerBottom">
        <span>© 2024 Digital Store</span>
      </div>
    </footer>
  );
}
