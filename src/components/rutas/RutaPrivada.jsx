import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const RutaPrivada = ({ Component }) => {
  const authContext = useContext(AuthContext)
  const { auth, cargando, usuarioAuth } = authContext

  useEffect(() => {
    usuarioAuth()
    //eslint-disable-next-line
  }, [])

  return !auth && !cargando ? <Navigate to="/" /> : <Component />
}

export default RutaPrivada
