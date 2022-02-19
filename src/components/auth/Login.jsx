import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
  const navigate = useNavigate()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { iniciarSesion, mensaje, auth } = authContext

  //en caso que el password o usuario no exista
  useEffect(() => {
    if (auth) {
      navigate('/proyectos')
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    //eslint-disable-next-line
  }, [mensaje, auth])

  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  })

  const { email, password } = usuario

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //validar que no haya campos vacios
    if (email.trim() === '' || password.trim() === '') {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
    }
    //pasarlo al action
    iniciarSesion({ email, password })
  }

  return (
    <div className="form-usuario">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <div className="contenedor-form sombra-dark">
        <h1>Inciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              placeholder="Tu Email"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Contraseña: </label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              placeholder="Tu Contraseña"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link to="/nueva-cuenta" className="enlace-cuenta center">
          Registrarse
        </Link>
      </div>
    </div>
  )
}

export default Login
