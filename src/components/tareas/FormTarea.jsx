import React, { useContext } from 'react';

import ProyectoContext from '../../context/Proyectos/ProyectoContext'

const FormTarea = () => {

    //extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext)
    const { proyecto } = proyectosContext

    if (!proyecto) return null

    const [proyectoActual] = proyecto

    const onClick = (e) => {
        e.preventDefault()
    }

    return (
        <div className='formulario'>
            <form>
                <div className='contendor-input'>
                    <input type='text' className='input-text' placeholder='Nombre Tarea...' name='nombre' />
                    <input type='submit' className='btn btn-primario btn-submit btn-block' value='Agregar Tarea' onClick={onClick} />

                </div>
            </form>
        </div>)
}
export default FormTarea;
