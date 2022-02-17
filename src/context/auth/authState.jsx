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

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    auth: null,
    usuario: null,
    mensaje: null
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
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
