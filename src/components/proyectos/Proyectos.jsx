import Barra from '../layout/Barra'
import Sidebar from '../layout/Sidebar'
import FormTarea from '../tareas/FormTarea'
import ListadoTarea from '../tareas/ListadoTarea'
import AuthContext from '../../context/auth/authContext'
import { useContext, useEffect } from 'react'

const Proyectos = () => {
  //extraer la info de auth
  const authContext = useContext(AuthContext)
  const { usuarioAuth } = authContext

  useEffect(() => {
    usuarioAuth()
  }, [])

  return (
    <div className="contenedor-app">
      <Sidebar />

      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas">
            <ListadoTarea />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Proyectos
