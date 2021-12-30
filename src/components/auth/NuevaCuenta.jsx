import {useState} from 'react'
import {Link} from 'react-router-dom'

const NuevaCuenta = () => {

    const [usuario,setUsuario] = useState({
        nombre:'',
        email:'',
        password:'',
        confirmar:''
    })

    const {nombre,email,password,confirmar} = usuario

    const onChange = e => { 
        setUsuario({
            ...usuario,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault()
    }

    return (
        <div className='form-usuario'>
            <div className='contenedor-form sombra-dark'>
                <h1>Registrarse</h1>
                <form onSubmit={handleSubmit}>
                <div className='campo-form'>
                        <label htmlFor='nombre'>Nombre:</label>
                        <input type='text' id='nombre' value={nombre} name='nombre' placeholder='Tu Nombre'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' value={email} name='email' placeholder='Tu Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Contraseña:</label>
                        <input type='password' id='password' value={password} name='password' placeholder='Tu Contraseña'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='confirmar'>Confirmar Contraseña:</label>
                        <input type='password' id='confirmar' value={confirmar} name='confirmar' placeholder='Repite tu Contraseña'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block' value='Crear Cuenta'/>
                    </div>
                </form>
                <Link to='/' className='enlace-cuenta center'>
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
