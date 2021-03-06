import { useReducer } from 'react'
import alertaReducer from './alertaReducer'
import alertaContext from './alertaContext'

import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from '../../types'

const AlertaState = ({ children }) => {
  const initialState = {
    alerta: null
  }

  const [state, dispatch] = useReducer(alertaReducer, initialState)
  const mostrarAlerta = (msg, categoria) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: {
        msg,
        categoria
      }
    })
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA
      })
    }, 5000)
  }

  return (
    <alertaContext.Provider value={{ alerta: state.alerta, mostrarAlerta }}>
      {children}
    </alertaContext.Provider>
  )
}

export default AlertaState
