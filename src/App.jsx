import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import AlertaState from './context/alertas/alertaState'
import ProyectoState from './context/Proyectos/ProyectoState'
import TareaState from './context/tareas/TareaState'
import AuthState from './context/auth/authState'
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/nueva-cuenta" element={<NuevaCuenta />} />
                <Route exact path="/proyectos" element={<Proyectos />} />
              </Routes>
            </BrowserRouter>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  )
}

export default App
