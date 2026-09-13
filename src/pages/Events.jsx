import { useEffect, useState } from 'react';
import { eventServices } from '../api/eventServices.js'
import { EventCard } from '../components/EventCard/EventCard';
import { useAuth } from '../context/AuthProvider.jsx'

import "./Events.css"

export const Events = () => {
    const { user, token } = useAuth();
    console.log('u', user)
    console.log('token', token)
    
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadEvents = async () => {
        try {
            const data = await eventServices.getAll('events');
            setEvents(data);
        } catch (err) {
            setError("No fue posible cargar los eventos.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

        loadEvents();
    }, []);

    if (isLoading) {
        return <p>Cargando eventos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
        
    return (
    <section className="events">
      <header className="events__header">
        <h1 className="events__title">Eventos</h1>
      </header>

      {events.length === 0 ? (
        <p>No se encontraron eventos.</p>
      ) : (
        <div className="events__grid">
          {events.map((event) => (
            <EventCard key={event.data.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}