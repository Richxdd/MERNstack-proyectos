import { useContext, useState } from 'react'
import proyectoContext from '../../context/Proyectos/proyectoContext'

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const { formulario, errorform, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext

    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    })

    const { nombre } = proyecto

    const onChangeProyecto = e => {
        guardarProyecto(
            {
                ...proyecto,
                [e.target.name]: e.target.value
            })
    }

    const onSubmitProyecto = e => {
        e.preventDefault()

        //validar el proyecto
        if (nombre === '') {
            mostrarError()
            return
        }

        //agregar el state 
        agregarProyecto(proyecto)

        // reiniciar el form
        guardarProyecto({ nombre: '' })
    }

    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return (
        <>
            <button type='button' className='btn btn-block btn-primario' onClick={onClickFormulario} >
                Nuevo Proyecto
            </button>
            {formulario ? (
                <form action="" className='formulario-nuevo-proyecto' onSubmit={onSubmitProyecto}>
                    <input type='text' className='input-text' placeholder='Nombre Proyecto' name='nombre' value={nombre} onChange={onChangeProyecto} />
                    <input type='submit' className='btn btn-primario btn-block' value='Agrega Proyecto' />
                </form>) :
                null}
            {errorform ? (<p className='mensaje error'>El nombre del Proyecto es obligatorio</p>) : null}

        </>
    )
}

export default NuevoProyecto
