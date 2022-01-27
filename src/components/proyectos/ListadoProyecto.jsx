import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/Proyectos/proyectoContext'
import Proyecto from './Proyecto'

const ListadoProyecto = () => {

    // Extraer proyectos del state incial
    const proyectosContext = useContext(proyectoContext)
    const { proyectos, obtenerProyectos } = proyectosContext

    //Obtener proyecto cuando carga el componente
    useEffect(() => {
        obtenerProyectos()
    }, [])

    // Revisar si hay algo en proyectos
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    return (
        <ul className='listado-proyectos'>
            {proyectos.map(proyecto => (
                <Proyecto key={proyecto.nombre} proyecto={proyecto} />))}
        </ul>
    )
}

export default ListadoProyecto
