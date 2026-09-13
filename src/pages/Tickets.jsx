import { useAuth } from "../context/AuthProvider.jsx";
import { ticketServices } from "../api/ticketService.js";
import { useEffect, useState } from "react";
import "./Tickets.css";

export const Tickets = () => {
    const { token } = useAuth();

    const [tickets, setTickets] = useState([]);
    const [msg, setMsg] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const handleFindTicket = async () => {
        try {
            setIsLoading(true);
            setMsg("");

            const findTickets = await ticketServices.getAll(
                "tickets",
                token
            );

            console.log("Respuesta tickets:", findTickets);

            // Validar que la respuesta sea un arreglo
            if (!Array.isArray(findTickets) || findTickets.length === 0) {
                setTickets([]);
                setMsg("No tienes tickets");
                return;
            }

            // Extraer el objeto ticket que está dentro de data
            const ticketsData = findTickets
                .filter((item) => item.success && item.data)
                .map((item) => item.data);

            if (ticketsData.length === 0) {
                setTickets([]);
                setMsg("No tienes tickets");
                return;
            }

            setTickets(ticketsData);
        } catch (error) {
            console.error("Error al buscar tickets:", error);
            setMsg("Error al buscar tickets, inténtelo más tarde");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            handleFindTicket();
        }
    }, [token]);

    return (
        <section className="tickets">

            <div className="tickets__header">
                <h1 className="tickets__title">Mis Tickets</h1>

                <p className="tickets__description">
                    Consulta tus entradas y la información de tus eventos.
                </p>
            </div>

            {isLoading && (
                <p className="tickets__message">
                    Cargando tus tickets...
                </p>
            )}

            {msg && !isLoading && (
                <p className="tickets__message">
                    {msg}
                </p>
            )}

            {!isLoading && tickets.length > 0 && (
                <div className="tickets__list">

                    {tickets.map((ticket) => (
                        <article
                            className="ticket-card"
                            key={ticket.id}
                        >

                            <div className="ticket-card__header">
                                <div>
                                    <span className="ticket-card__label">
                                        Código
                                    </span>

                                    <h2 className="ticket-card__code">
                                        {ticket.codigo}
                                    </h2>
                                </div>

                                <span className="ticket-card__status">
                                    {ticket.estado}
                                </span>
                            </div>

                            <div className="ticket-card__body">

                                <div className="ticket-card__info">
                                    <span>Tipo</span>
                                    <strong>{ticket.tipo}</strong>
                                </div>

                                <div className="ticket-card__info">
                                    <span>Precio</span>

                                    <strong>
                                        $
                                        {Number(ticket.precio).toLocaleString(
                                            "es-CO"
                                        )}
                                    </strong>
                                </div>

                            </div>

                            <div className="ticket-card__event">

                                <span className="ticket-card__label">
                                    Evento
                                </span>

                                <h3>
                                    {ticket.evento?.nombre}
                                </h3>

                                <p>
                                    {ticket.evento?.categoria}
                                </p>

                                <p>
                                    📍 {ticket.evento?.lugar}
                                </p>

                                <p>
                                    📅{" "}
                                    {ticket.evento?.fechaEvento
                                        ? new Date(
                                              ticket.evento.fechaEvento
                                          ).toLocaleDateString("es-CO")
                                        : "Fecha no disponible"}
                                </p>

                            </div>

                        </article>
                    ))}

                </div>
            )}

        </section>
    );
};