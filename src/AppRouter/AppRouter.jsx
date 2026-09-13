import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { News } from "../pages/News";
import { Tickets } from "../pages/Tickets";
import { Profile } from "../pages/Profile";
import { MainLayout } from "../layout/MainLayout";
import { Events } from "../pages/Events";
import { EventDetail } from "../components/EventDetail/EventDetail";
import { LoginSingup } from "../components/Auth/LoginSignup";
import { TicketPurchase } from "../components/Ticket/TicketPurchase";


export const AppRouter = () => {
  return (
    <Routes>
       <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/eventos/:id" element={<EventDetail />} />
          <Route path="/login" element={<LoginSingup />} />
          <Route path="events/:id/purchase" element={<TicketPurchase />} />
        </Route>
    </Routes>
  );
};