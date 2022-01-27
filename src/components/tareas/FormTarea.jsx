import React, { useContext, useState } from 'react';

import proyectoContext from '../../context/Proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { agregarTarea } = tareasContext

    const [tarea, setTarea] = useState({ nombre: '', })

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

        //pasar validacion 

        //agregar nueva tarea
        tarea.proyectoId = proyectoActual.id
        tarea.estado
        agregarTarea(tarea)

        //reinicar el form
    }

    return (
        <div className='formulario'>
            <form onSubmit={onSubmit}>
                <div className='contendor-input'>
                    <input type='text' className='input-text' placeholder='Nombre Tarea...' name='nombre' onChange={handleChange} value={nombre} />
                    <input type='submit' className='btn btn-primario btn-submit btn-block' value='Agregar Tarea' onClick={onSubmit} />

                </div>
            </form>
        </div>)
}
export default FormTarea;
