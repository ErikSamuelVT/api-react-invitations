import swal from 'sweetalert';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendRequest } from '../../services/request'

function Login() {
  const [dataForm, setDataForm] = useState({ email: "", password: "" })

  const handleChange = (e: any) => {
    //SAVE THE INFORMATION OBTAINED FORM THE FORM
    setDataForm({ ...dataForm, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const dataReq = await sendRequest('login', 'POST', dataForm)

    if (dataReq.error === true) {
      swal("Error!", `${dataReq.data || dataReq.message}`, "error")
    }

    if (dataReq.error === false && dataReq.message === "Loged") {
      const token = dataReq.token.token
      swal("Welcome", "\n", "success", { buttons: [false] })
      localStorage.setItem('auth-token', JSON.stringify(token))
      setTimeout(() => window.location.href = '/invitations', 1000);
    }
  }

  return (
    <div className='container vh-100 d-flex justify-content-center align-items-center'>
      <div className="card p-4 shadow p-3 mb-5 bg-body rounded" style={{ width: "18rem" }}>
        <div className="cart-body">
          <h1 className="card-title text-center">
            NEXTIA
            <span className='d-block text-center text-muted fs-6'>Login</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className='form-label'>
              Email
              <input type="email" className='form-control' name="email" id="email" placeholder='example@example.com' required={true} onChange={handleChange} />
            </label>
            <label htmlFor="password" className='form-label'>
              Password
              <input type="password" className='form-control' name="password" id="password" placeholder='******' required={true} onChange={handleChange} />
            </label>
            <div >
              <button className="btn btn-primary btn-lg w-100">Login</button>
              <Link to={"/recover"} className="d-block pt-3 fs-6 fw-light text-center">Did you forget your password?</Link>
              <hr />
              <Link to={"/register"} className="btn btn-success btn-lg w-100">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login