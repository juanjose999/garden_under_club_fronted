import { useAuth } from '../context/AuthProvider'
import './Profile.css'
export const Profile = () => {
    const { user, token } = useAuth();
    console.log('hola perfil')
    console.log('user', user)
    console.log('t', token)
    return<>
        <header className="header">

      <div className="header__user">

        <div className="header__avatar">
          {user?.nombre?.charAt(0)}
        </div>

        <div className="header__info">
          <span className="header__name">
            {user?.nombre} {user?.apellido || ""}
          </span>

          
        </div>

        <span className="header__email">
            {user?.email}
          </span>

          <span className="header__email">
            {user?.documento}
          </span>

      </div>

    </header>
    </>
}