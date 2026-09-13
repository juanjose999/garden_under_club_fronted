import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <section className="footer__brand">
          <h2 className="footer__title">Garden</h2>
          <p className="footer__description">
            Plataforma para la gestión de eventos, noticias y tickets de manera
            rápida y segura.
          </p>
        </section>

        <nav className="footer__nav" aria-label="Enlaces del pie de página">
          <a href="/contacto" className="footer__link">
            Contáctanos
          </a>
          <a href="/terminos" className="footer__link">
            Términos y Condiciones
          </a>
          <a href="/ubicacion" className="footer__link">
            Ubicación
          </a>
        </nav>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2026 Garden. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};