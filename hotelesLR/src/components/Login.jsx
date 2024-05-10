import { useState } from "react"
import { useLogin } from "../shared/hooks/useLogin"


export const Login = ({switchAuthHandler}) => {
    const { login, isLoading } = useLogin()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e)=>{
    setFormData((prevData)=> (
      {
        ...prevData,
        [e.target.name]: e.target.value
      }
    ))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(
      formData.email,
      formData.password
    )
  }
  return (
    <div className="login ">
    <form onSubmit={handleSubmit}> 
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
        <input value={formData.email} onChange={handleChange} name="email" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input value={formData.password} onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
      <button type="submit" onClick={switchAuthHandler} className="btnRegister ">Registrarse</button>
    </form>
  </div>
  )
}
