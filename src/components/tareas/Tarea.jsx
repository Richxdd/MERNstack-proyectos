import React, { useContext } from 'react'

import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/Proyectos/proyectoContext'

const Tarea = ({ tarea }) => {
  const proyectosContext = useContext(proyectoContext)
  const { proyecto } = proyectosContext

  //obtener la funcion del context de tarea
  const tareasContext = useContext(tareaContext)
  const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
    tareasContext

  //extraer el proyecto actual
  const [proyectoActual] = proyecto
  //funcion cuando el usuario elimina tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id, proyectoActual._id)
    obtenerTareas(proyectoActual._id)
  }
  //funcion que modifica el estaod de tareas
  const cambiarEstado = (tarea) => {
    if (tarea.estado) {
      tarea.estado = false
    } else {
      tarea.estado = true
    }
    actualizarTarea(tarea)
  }
  const selectTarea = (tarea) => {
    guardarTareaActual(tarea)
  }
  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTarea(tarea)}>
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea._id)}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default Tarea
