import React, { useReducer } from 'react'

import proyectoContext from './proyectoContext'
import ProyectoReducer from './ProyectoReducer'
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORM,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from '../../types'
import clienteAxios from '../../config/axios'

const ProyectoState = ({ children }) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorform: false,
    proyecto: null,
    mensaje: null
  }
  //Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ProyectoReducer, initialState)

  //serie de funciones para el crud
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO
    })
  }

  // Obtener los proyectos

  const obtenerProyectos = async () => {
    try {
      const res = await clienteAxios.get('/api/proyectos')
      dispatch({
        type: OBTENER_PROYECTOS,
        payload: res.data.proyectos
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Agregar nuevo proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const res = await clienteAxios.post('/api/proyectos', proyecto)
      console.log(res)
      //insertar el proyecto en state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: res.data
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  //Validar form por errores

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORM
    })
  }

  // seleccionar el proyecto que el usuario selecciona
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Elimina un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId
      })
    } catch (error) {
      const alerta = {
        msg: 'Hubo un error',
        categoria: 'alerta-error'
      }
      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta
      })
    }
  }

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorform: state.errorform,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto
      }}>
      {children}
    </proyectoContext.Provider>
  )
}

export default ProyectoState
