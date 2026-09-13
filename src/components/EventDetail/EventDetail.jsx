import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventServices } from "../../api/eventServices";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

import "./EventDetail.css";

export const EventDetail = () => {
  const { user, token } = useAuth();
  const { id } = useParams();
  const isLogin = token != null;

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await eventServices.getById("events", id);
        setEvent(data);
      } catch (err) {
        setError("No fue posible cargar el evento.");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  useEffect(() => {
    if (!event?.data?.linkPhoto?.length) {
      return;
    }

      const interval = setInterval(() => {
      setCurrentImg((current) => 
        (current + 1) % event.data.linkPhoto.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [event]);

  console.log(currentImg)

  if (isLoading) return <p>Cargando evento...</p>;
  if (error) return <p>{error}</p>;

  const { data } = event;
  console.log('data:',data )
  console.log(data.linkPhoto)
  
  return (
    <article className="event-detail">
        <Link
            to={'/eventos'}
        >back
        </Link>

     

      <section className="event-detail__content">
        <section className="event-detail__card">

           <header className="event-detail__hero">
              <div className="event-detail__galery">
              {data.linkPhoto.map((d, i) => (
                <figure
                  key={d}
                  className="event-detail__media"
                >
                  <img
                    className={currentImg === i ? "event-detail__image event-detail__image--active" : "event-detail__image"}
                    src={d}
                    alt={d}
                  />
                </figure>
              ))}
            </div>

              <div className="event-detail__summary">
                <span className="event-detail__category">{data.categoria}</span>

                <h1 className="event-detail__title">{data.nombre}</h1>

                <p className="event-detail__description">{data.descripcion}</p>

                <div className="event-detail__badges">
                  <span className="event-detail__status">{data.estado}</span>
                  <span className="event-detail__capacity">
                    👥 {data.capacidad} personas
                  </span>
                </div>
              </div>
            </header>

          <header className="event-detail__card-header">
            <h2>Información del evento</h2>
          </header>

          <div className="event-detail__grid">
            <div className="event-detail__item">
              <span className="event-detail__label">Lugar</span>
              <p>{data.lugar}</p>
            </div>

            <div className="event-detail__item">
              <span className="event-detail__label">Dirección</span>
              <p>{data.direccion}</p>
            </div>

            <div className="event-detail__item">
              <span className="event-detail__label">Estado</span>
              <p>{data.estado}</p>
            </div>

            <div className="event-detail__item">
              <span className="event-detail__label">Capacidad</span>
              <p>{data.capacidad} personas</p>
            </div>

           
          </div>

         <span className="event-detail__price-label">Precio desde</span>

          <strong className="event-detail__price">
            ${data.precioBase}
          </strong>

          <div className="btns">

          

          {isLogin ? (
              <Link
                to={`/events/${id}/purchase`}
                className="event-detail__button"
                 state={{ event: data }}
              >
                Comprar ticket
              </Link>
            ) : (
              <Link
                to="/login"
                className="event-detail__button"
              >
                Iniciar sesión para adquirir ticket
              </Link>
            )}

            </div>
        </section>


      </section>
    </article>
  );
};