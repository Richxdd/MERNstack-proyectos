import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/auth/authContext'
import { useNavigate } from 'react-router-dom'

const NuevaCuenta = () => {
  const navigate = useNavigate()
  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  const authContext = useContext(AuthContext)
  const { registrarUsuario, mensaje, auth } = authContext

  //en caso que el usuario sea auth o duplicado
  useEffect(() => {
    if (auth) {
      navigate('/proyectos')
    }
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
  }, [mensaje, auth])

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })

  const { nombre, email, password, confirmar } = usuario

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    //validar que no haya  campos vacios
    if (
      nombre.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmar.trim() === ''
    ) {
      mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
      return
    }

    //password minimo 6 letras
    if (password.length < 6) {
      mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error')
      return
    }
    //los 2 password iguales
    if (password !== confirmar) {
      mostrarAlerta('Los password no son iguales', 'alerta-error')
      return
    }
    //pasarlo al action
    registrarUsuario({ nombre, email, password })
  }

  return (
    <div className="form-usuario">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <div className="contenedor-form sombra-dark">
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              name="nombre"
              placeholder="Tu Nombre"
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="password">Contraseña:</label>
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
            <label htmlFor="confirmar">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmar"
              value={confirmar}
              name="confirmar"
              placeholder="Repite tu Contraseña"
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Crear Cuenta"
            />
          </div>
        </form>
        <Link to="/" className="enlace-cuenta center">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  )
}

export default NuevaCuenta
