import React, { useContext, useState, useEffect } from 'react'

import proyectoContext from '../../context/Proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
  //extraer si un proyecto esta activo
  const proyectosContext = useContext(proyectoContext)
  const { proyecto } = proyectosContext

  //obteenwer la funcion del context de tarea
  const tareasContext = useContext(tareaContext)
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareasContext

  //detecta si hay una tarea seleccionada
  useEffect(() => {
    if (tareaseleccionada !== null) {
      setTarea(tareaseleccionada)
    } else {
      setTarea({ nombre: '' })
    }
  }, [tareaseleccionada])

  const [tarea, setTarea] = useState({ nombre: '' })

  const { nombre } = tarea

  if (!proyecto) return null

  //extraer proyecto actual
  const [proyectoActual] = proyecto

  //leer los valores del form
  const handleChange = (e) => {
    setTarea({
      ...tarea,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    //validar
    if (nombre.trim() === '') {
      validarTarea()
      return
    }

    //si es editar o agregar
    if (tareaseleccionada === null) {
      //tarea nueva
      //agregar nueva tarea
      tarea.proyectoId = proyectoActual.id
      tarea.estado
      agregarTarea(tarea)
    } else {
      //actualizar tarea existente
      actualizarTarea(tarea)

      //elimina la tarea seleccionada del state
      limpiarTarea()
    }

    //pasar validacion

    //obtener y filtrar tareas
    obtenerTareas(proyectoActual.id)

    //reinicar el form
    setTarea({
      nombre: ''
    })
  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contendor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            onChange={handleChange}
            value={nombre}
          />
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
            onClick={onSubmit}
          />
        </div>
      </form>
      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  )
}
export default FormTarea
