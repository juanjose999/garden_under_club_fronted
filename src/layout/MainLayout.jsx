import { Header } from "../components/Header/Header"
import { Sidebar } from "../components/SideBar/SideBar"
import { Footer } from "../components/Footer/Footer"
import { Home } from "../pages/Home"

import "./MainLayout.css"
import { Outlet } from "react-router-dom";


export const MainLayout = () => {

    return<>
        <Header />
        <div className="layout__body">

            <aside className="layout__sidebar">
                <Sidebar />
            </aside>

            <main className="layout__content">
                <Outlet></Outlet>
            </main>
            
        </div>
        <Footer />
    </>

}