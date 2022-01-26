import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid';
import ProyectoContext from './ProyectoContext'
import ProyectoReducer from './ProyectoReducer'
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORM, PROYECTO_ACTUAL, ELIMINAR_PROYECTO } from '../../types'


const ProyectoState = ({ children }) => {
  const proyectos = [
    { id: 1, nombre: 'Tienda Virtual' },
    { id: 2, nombre: 'Intranet' },
    { id: 3, nombre: 'Diseño de Sitio web' },
    { id: 4, nombre: 'MERN' },
  ]

  const initialState = {
    proyectos: [],
    formulario: false,
    errorform: false,
    proyecto: null
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

  const obtenerProyectos = () => {
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos
    })
  }

  //Agregar nuevo proyecto
  const agregarProyecto = proyecto => {
    proyecto.id = uuidv4();

    //insertar el proyecto en state
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto
    })
  }

  //Validar form por errores

  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORM
    })
  }

  // seleccionar el proyecto que el usuario selecciona 
  const proyectoActual = proyectoId => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId
    })
  }

  // Elimina un proyecto
  const eliminarProyecto = proyectoId => {
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId
    })
  }
  return (
    <ProyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorform: state.errorform,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
      }}
    >
      {children}
    </ProyectoContext.Provider>
  )
}

export default ProyectoState
