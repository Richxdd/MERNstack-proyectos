import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/Proyectos/proyectoContext'
import Proyecto from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}

export default ListadoProyecto
