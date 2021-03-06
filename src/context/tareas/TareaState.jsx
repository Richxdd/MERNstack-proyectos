import { useReducer } from 'react'
import tareaContext from './tareaContext'
import TareaReducer from './TareaReducer'

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREA
} from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = ({ children }) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null
  }

  //crear disptach y state

  const [state, dispatch] = useReducer(TareaReducer, initialState)

  //Crear las funciones

  //Obtener tareas de un proyecto
  const obtenerTareas = async (proyecto) => {
    try {
      const res = await clienteAxios.get('/api/tareas', { params: { proyecto } })
      console.log(res)
      dispatch({
        type: TAREAS_PROYECTO,
        payload: res.data.tareas
      })
    } catch (error) {
      console.log(error)
    }
  }

  //Agregar tareas
  const agregarTarea = async (tarea) => {
    try {
      const res = await clienteAxios.post('/api/tareas', tarea)

      dispatch({
        type: AGREGAR_TAREA,
        payload: res.data.tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  //valida y muetra error
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA
    })
  }

  //elimina tarea por id
  const eliminarTarea = async (id, proyecto) => {
    try {
      await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
    } catch (error) {
      console.log(error)
    }
  }

  //edita una tarea
  const actualizarTarea = async (tarea) => {
    try {
      const res = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
      dispatch({
        type: ACTUALIZAR_TAREA,
        payload: res.data.tarea
      })
    } catch (error) {
      console.log(error)
    }
  }

  //extrae una tarea para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea
    })
  }

  //elimina la tarea seleccionada
  const limpiarTarea = () => {
    dispatch({
      type: LIMPIAR_TAREA
    })
  }
  return (
    <tareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        guardarTareaActual,
        actualizarTarea,
        limpiarTarea
      }}>
      {children}
    </tareaContext.Provider>
  )
}

export default TareaState
