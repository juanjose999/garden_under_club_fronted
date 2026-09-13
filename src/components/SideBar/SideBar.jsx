import { useState } from "react";
import "./SideBar.css";
import "../../styles/variables.css";

import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { id: "events", label: "Eventos", path: "/eventos" },
  { id: "tickets", label: "Mis Tickets", path: "/tickets" },
  { id: "profile", label: "Mi Perfil", path: "/perfil" },

];

export const Sidebar = () => {

  const [activeSection, setActiveSection] = useState("events");

  const handleChangeSection = (event) => {
    const section = event.currentTarget.dataset.section;
    setActiveSection(section);
  };

  return (
    <aside className="sidebar">


      <nav className="sidebar__nav" aria-label="Menú principal">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            data-section={item.id}
            onClick={handleChangeSection}
            className={`sidebar__link ${
              activeSection === item.id ? "sidebar__link--active" : ""
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};