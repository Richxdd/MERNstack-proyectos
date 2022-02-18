import { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  CERRAR_SESION
} from '../../types'
import clienteAxios from '../../config/axios'
import tokenAuth from '../../config/token'

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    usuario: null,
    mensaje: null,
    cargando: true
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  //las funciones
  const registrarUsuario = async (datos) => {
    try {
      const res = await clienteAxios.post('/api/usuarios', datos)
      console.log(res.data)
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: res.data
      })
      //obtener el usuario
      usuarioAuth()
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta
      })
    }
  }

  //Retorna el usuario auth
  const usuarioAuth = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      //Todo funcion para enviar el token por headers
      tokenAuth(token)
    }
    try {
      const res = await clienteAxios.get('/api/auth')
      dispatch({
        type: OBTENER_USUARIO,
        payload: res.data.usuario
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: LOGIN_ERROR
      })
    }
  }
  //cuando el usuario hace login
  const iniciarSesion = async (datos) => {
    try {
      const res = await clienteAxios.post('/api/auth', datos)
      dispatch({
        type: LOGIN_EXITOSO,
        payload: res.data
      })
      //obtener el usuario
      usuarioAuth()
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: 'alerta-error'
      }
      dispatch({
        type: LOGIN_ERROR,
        payload: alerta
      })
    }
  }
  //cierra la sesion del usuario
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    })
  }
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSesion,
        usuarioAuth,
        cerrarSesion
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
