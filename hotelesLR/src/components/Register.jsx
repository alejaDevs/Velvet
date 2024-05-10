import { useRegister } from '../shared/hooks/useRegister'
import { useState } from 'react'
import {Logo} from './Logo.jsx'

export const Register = ({switchAuthHandler}) => {
  const { register, isLoading } = useRegister()
  const [formData, setFormData] = useState(

    {
      name: {
        value: "",
        isValid: false,
        showError: false
      },

      surname: {
        value: "",
        isValid: false,
        showError: false
      },

      phone: {
        value: "",
        isValid: false,
        showError: false
      },

      email: {
        value: '',
        isValid: false,
        showError: false
      },
      password: {
        value: '',
        isValid: false,
        showError: false
      },
      passwordConfirm: {
        value: '',
        isValid: false,
        showError: false
      }
    }
  )

    const handleChange = (e)=>{
      setFormData((prevData)=>(
       {
        ...prevData,
        [e.target.name]: e.target.value
       } 
      ))
    }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(
      formData.email,
      formData.password,
      formData.name,
      formData.surname,
      formData.phone
    )
  }
  return (
    <div className='register'>
      <form onSubmit={handleSubmit}> 
      <h1>Velvet</h1>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
        <input value={formData.name.value} onChange={handleChange} name="name" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Apellido</label>
        <input value={formData.surname.value} onChange={handleChange} name="surname" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Telefono</label>
        <input value={formData.phone.value} onChange={handleChange} name="phone" type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input value={formData.email.value} onChange={handleChange} name="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div><div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Contraseña</label>
        <input value={formData.password.value} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Confirmar Contraseña</label>
        <input value={formData.passwordConfirm.value} onChange={handleChange} name="passwordConfirm" type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <br />
      <br />
      <button type="submit" onClick={switchAuthHandler} className="btn btn-primary">Registrarse</button>
    </form>
    <div className='imgLogo'>
      <Logo/>
    </div>
    </div>
  )
}
