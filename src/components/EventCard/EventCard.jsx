import "./EventCard.css";
import { Link } from "react-router-dom";


export const EventCard = ({ event }) => {

  const { data, descripcion } = event;
 
  return (
    <article className="event-card">
      <figure className="event-card__media">
        {data.linkPhoto ? (
          <img
            src={data.linkPhoto}
            alt={data.nombre}
            className="event-card__image"
          />
        ) : (
          <div className="event-card__placeholder" />
        )}
      </figure>

      <div className="event-card__body">
        <header className="event-card__header">
          <span className="event-card__category">{data.categoria}</span>
          <span className="event-card__status">{data.estado}</span>
        </header>

        <h2 className="event-card__title">{data.nombre}</h2>

        <p className="event-card__description">{descripcion}</p>

        <section className="event-card__details">
          <p>📍 {data.lugar}</p>
          <p>🛣️ {data.direccion}</p>
          <p>👥 {data.capacidad} personas</p>
        </section>

        <footer className="event-card__footer">
          <strong className="event-card__price">
            ${data.precioBase}
          </strong>

          <Link
            to={`/eventos/${event.data.id}`}
            className="event-card__button"
          >
            Ver evento
          </Link>
        </footer>
      </div>
    </article>
  );
};