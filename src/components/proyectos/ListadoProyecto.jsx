import React, { useContext, useEffect } from 'react'
import proyectoContext from '../../context/Proyectos/proyectoContext'
import Proyecto from './Proyecto'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import AlertaContext from '../../context/alertas/alertaContext'

const ListadoProyecto = () => {
  // Extraer proyectos del state incial
  const proyectosContext = useContext(proyectoContext)
  const { mensaje, proyectos, obtenerProyectos } = proyectosContext

  const alertaContext = useContext(AlertaContext)
  const { alerta, mostrarAlerta } = alertaContext

  //Obtener proyecto cuando carga el componente
  useEffect(() => {
    //si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria)
    }
    obtenerProyectos()
  }, [mensaje])

  // Revisar si hay algo en proyectos
  if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

  return (
    <ul className="listado-proyectos">
      {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  )
}

export default ListadoProyecto
