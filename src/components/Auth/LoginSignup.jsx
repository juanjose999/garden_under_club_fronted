import { use, useState } from "react";
import { apiUsers } from '../../api/userServices'
import { useAuth } from '../../context/AuthProvider'
import './LoginSignup.css'
 import { useNavigate } from "react-router-dom";

export const LoginSingup = () => {
  const navigate = useNavigate()
  const { login } = useAuth();
  const [SignupFormData, setSignupFormData] = useState({
    nombre: "",
    apelligo: "",
    email: "",
    password: "",
    telephone: "",
    documento: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email:"",
    password:""
  })

  const [isSignup, setIsSignup] = useState(true)

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    if(isSignup){

      setSignupFormData((currentData) => ({
        ...currentData,
        [name]: value,
      }));

    } 
    else{
        setLoginFormData((currentData) => ({
        ...currentData,
        [name]: value,
      }));
    }

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    if(isSignup){
      console.log('dataToSend->', SignupFormData)
      const resulSignup = await apiUsers.singup('auth/signup', SignupFormData)
      console.log('response:',resulSignup)

      const userData = resulSignup.user
      const token = resulSignup.data.token
      const data = {
        token: token, 
        userData: userData
      }
      console.log('data',data)
      login( userData, token)
      navigate('/eventos')
    }else{

      const resulSignup = await apiUsers.singup('auth/login', loginFormData)
      console.log('dataToSend->', resulSignup)
    }

    /** 
    
    if(!resulSignup.success){
        setError("No fue posible crear la cuenta");
        return;
    }

    const { token  } = resulSignup.data
    const { user } = resulSignup.use

    login(token, user)
    
    console.log(resulSignup)
    */
  };


  if(isSignup){
    return (
    <main className="register">
      <section className="register__card">
        <header className="register__header">

          <h1 className="register__title">Crear cuenta</h1>
          <p className="register__description">
            Completa tus datos para registrarte en Garden.
          </p>
        </header>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__field">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={SignupFormData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="apelligo">Apellido</label>
            <input
              id="apelligo"
              name="apelligo"
              type="text"
              value={SignupFormData.apelligo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={SignupFormData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={SignupFormData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="telephone">Teléfono</label>
            <input
              id="telephone"
              name="telephone"
              type="tel"
              value={SignupFormData.telephone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="documento">Documento</label>
            <input
              id="documento"
              name="documento"
              type="text"
              value={SignupFormData.documento}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="register__error">
              {error}
            </p>
          )}

          <button
            className="register__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Crear cuenta"}
          </button>

        
        </form>
        <button
            onClick={() => setIsSignup(false)}
          >
            Iniciar sección
        </button>

      </section>
    </main>
  );

  }

  return (
    <main className="register">
      <section className="register__card">
        <header className="register__header">

          <h1 className="register__title">Ingresa a tu cuenta</h1>
          <p className="register__description">
            Ingrese sus credenciales
          </p>
        </header>

        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginFormData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register__field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginFormData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="register__button"
            type="submit"
            disabled={isLoading}
          >
            Ingresar
          </button>
        </form>

        


          <button
            onClick={() => setIsSignup(true)}
          >
            Registrese 
          </button>

      </section>
    </main>
  );
};