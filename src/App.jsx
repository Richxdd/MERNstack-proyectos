import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import NuevaCuenta from "./components/auth/NuevaCuenta"
import Proyectos from "./components/proyectos/Proyectos"
import ProyectoState from "./context/Proyectos/ProyectoState"


BrowserRouter


function App() {

  return (
    <ProyectoState>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/nueva-cuenta' element={<NuevaCuenta />} />
          <Route exact path='/proyectos' element={<Proyectos />} />
        </Routes>
      </BrowserRouter>
    </ProyectoState>
  )
}

export default App
