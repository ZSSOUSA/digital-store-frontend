import "./section.css";

export default function Section({ title, titleAlign = "left", link, children }) {
  return (
    <section className="section">
      <div className={`sectionHeader sectionHeader--${titleAlign}`}>
        <h2>{title}</h2>
        {link && <a href={link.href}>{link.text}</a>}
      </div>

      <div className="sectionContent">
        {children}
      </div>
    </section>
  );
}
