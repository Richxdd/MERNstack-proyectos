import { BrowserRouter,Route,Routes } from "react-router-dom"
import Login from "./components/auth/Login"
import NuevaCuenta from "./components/auth/NuevaCuenta"
import Proyectos from "./components/proyectos/Proyectos"

BrowserRouter


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/nueva-cuenta' element={<NuevaCuenta/>}/>
        <Route exact path='/proyectos' element={<Proyectos/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
