import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import { ticketServices } from "../../api/ticketService";

import "./TicketPurchase.css";

export const TicketPurchase = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const location = useLocation();

    const event = location.state?.event;

    const [isLoading, setIsLoading] = useState(false);
    const [ticket, setTicket] = useState(null);
    const [error, setError] = useState("");

    const [body] = useState({
        eventoId: id,
        codigo: "random",
        tipo: "VIP",
        precio: event?.precioBase,
        estado: "NO CONSUMIDO"
    });

    const handleFinishPurchase = async () => {
        setIsLoading(true);
        setError("");
        setTicket(null);

        try {
            const result = await ticketServices.purchaseTicket(
                "tickets",
                token,
                body
            );

            console.log("Resultado compra:", result);

            if (!result || !result.success || !result.data) {
                setError(
                    result?.message ||
                    "No fue posible completar la compra del ticket."
                );
                return;
            }

            setTicket(result.data);

        } catch (error) {
            console.error("Error comprando ticket:", error);

            setError(
                "Ocurrió un error al procesar la compra. Inténtalo nuevamente."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!event) {
        return (
            <section className="ticket-purchase">
                <div className="ticket-purchase__state ticket-purchase__state--error">
                    <span className="ticket-purchase__state-icon">!</span>
                    <h1>Evento no disponible</h1>
                    <p>
                        No se encontró la información del evento.
                        Regresa al listado e inténtalo nuevamente.
                    </p>
                </div>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className="ticket-purchase">
                <div className="ticket-purchase__state">
                    <span className="ticket-purchase__loader"></span>

                    <h1>Procesando compra</h1>

                    <p>
                        Estamos generando tu ticket. Por favor, espera un momento.
                    </p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="ticket-purchase">
                <div className="ticket-purchase__state ticket-purchase__state--error">
                    <span className="ticket-purchase__state-icon">!</span>

                    <h1>No se pudo completar la compra</h1>

                    <p>{error}</p>

                    <button
                        className="ticket-purchase__button"
                        onClick={handleFinishPurchase}
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </section>
        );
    }

    if (ticket) {
        return (
            <section className="ticket-purchase">
                <div className="ticket-purchase__success">
                    <div className="container-success">
                            <div>
                                <div className="ticket-purchase__success-icon">
                                    ✓
                                </div>

                            </div>

                            <div>
                                <h1 className="ticket-purchase__title">
                                    ¡Tu ticket está listo!
                                </h1>
                                
                                <span className="ticket-purchase__eyebrow">
                                    Compra confirmada
                                </span>

                                <p className="ticket-purchase__description">
                                    La compra se realizó correctamente. Guarda los datos
                                    de tu ticket para el ingreso al evento.
                                </p>

                                

                            </div>
                    </div>
                    
                    

                </div>
            </section>
        );
    }

    return (
        <section className="ticket-purchase">
            <div className="ticket-purchase__header">
                <span className="ticket-purchase__eyebrow">
                    Confirmar compra
                </span>

                <h1 className="ticket-purchase__title">
                    Adquiere tu entrada
                </h1>

                <p className="ticket-purchase__description">
                    Revisa los detalles antes de confirmar tu compra.
                </p>
            </div>

            <div className="ticket-purchase__card">
                <div className="ticket-purchase__event">
                    <span className="ticket-purchase__label">
                        Evento seleccionado
                    </span>

                    <h2 className="ticket-purchase__event-name">
                        {event.nombre}
                    </h2>

                    <p className="ticket-purchase__event-description">
                        {event.descripcion}
                    </p>
                </div>

                <div className="ticket-purchase__details">
                    <div className="ticket-purchase__info">
                        <span className="ticket-purchase__label">
                            Categoría
                        </span>

                        <strong>
                            {event.categoria}
                        </strong>
                    </div>

                    <div className="ticket-purchase__info">
                        <span className="ticket-purchase__label">
                            Lugar
                        </span>

                        <strong>
                            {event.lugar}
                        </strong>
                    </div>

                    <div className="ticket-purchase__info">
                        <span className="ticket-purchase__label">
                            Tipo de ticket
                        </span>

                        <strong>
                            VIP
                        </strong>
                    </div>

                    <div className="ticket-purchase__info">
                        <span className="ticket-purchase__label">
                            Precio
                        </span>

                        <strong className="ticket-purchase__price">
                            ${event.precioBase?.toLocaleString("es-CO")}
                        </strong>
                    </div>
                </div>

                <button
                    className="ticket-purchase__button"
                    onClick={handleFinishPurchase}
                    disabled={isLoading}
                >
                    Confirmar y comprar
                </button>
            </div>
        </section>
    );
};