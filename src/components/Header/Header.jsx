import "./Header.css"
import logo  from "../../assets/logo.png"
import { useAuth } from '../../context/AuthProvider'

export const Header = () => {

    const {user, token} = useAuth()
    
    return <>
        <header className="header">
        <div className="header__container">
            <a href="/" className="header__brand">
            <img className="header__logo" src={logo} alt="Logo de la empresa" />
            </a>

            <nav className="header__nav" aria-label="Navegación principal">

            {user ? (
                <a href="/tickets" className="header__link header__link--active">
                    Mis Tickets
                </a>

            ) :
            (
                <a href="/login" className="header__link">
                    Inicial sección
                </a>
            )}

            </nav>
        </div>
        </header>
    </>
}