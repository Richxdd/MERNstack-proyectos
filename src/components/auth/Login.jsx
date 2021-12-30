import {useState} from 'react'
import {Link} from 'react-router-dom'

const Login = () => {

    const [usuario,setUsuario] = useState({
        email:'',
        password:''
    })

    const {email,password} = usuario

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
                <h1>Inciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className='campo-form'>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' value={email} name='email' placeholder='Tu Email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <label htmlFor='password'>Contraseña: </label>
                        <input type='password' id='password' value={password} name='password' placeholder='Tu Contraseña'
                            onChange={onChange}
                        />
                    </div>
                    <div className='campo-form'>
                        <input type='submit' className='btn btn-primario btn-block' value='Iniciar Sesión'/>
                    </div>
                </form>
                <Link to='/nueva-cuenta' className='enlace-cuenta center'>
                    Registrarse
                </Link>
            </div>
        </div>
    )
}

export default Login
