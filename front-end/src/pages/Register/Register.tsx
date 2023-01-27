import swal from 'sweetalert'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {sendRequest} from '../../services/request'


function Register() {
  const [dataForm, setDataForm] = useState({name: "", lastname: "", nodepartment: "", email:"",password:""})

  const handleChange = (e: any) => {
    setDataForm({...dataForm, [e.target.name]: e.target.value})
  }
 
  const handleSubmit = async(e:any) => {
    e.preventDefault()
    const dataReq = await sendRequest('register','POST',dataForm)

    if(dataReq.error === true){
      swal("Error!", `${dataReq.data || dataReq.message}`, "error")
    }

    if(dataReq.error === false && dataReq.message === "User saved"){
      swal("Registered user", "","success")
      //Code to redirect to login
    }
  }

  return (
    <div className='container vh-100 d-flex justify-content-center align-items-center'>
      <div className="card p-4 shadow p-3 mb-5 bg-body rounded" style={{ width: "18rem" }}>
        <div className="cart-body">
          <h1 className="card-title text-center">
            NEXTIA
            <span className='d-block text-center text-muted fs-6'>Register</span>
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className='form-label'>
              Name
              <input type="text" className='form-control' name="name" id="name" placeholder='John' required={true} onChange={handleChange}/>
            </label>
            <label htmlFor="lastname" className='form-label'>
              Lastname
              <input type="text" className='form-control' name="lastname" id="lastname" placeholder='Gigs' required={true} onChange={handleChange}/>
            </label>
            <label htmlFor="nodepartment" className='form-label'>
              No.Department
              <input type="text" className='form-control' name="nodepartment" id="nodepartment" placeholder='50' required={true} onChange={handleChange}/>
            </label>
            <label htmlFor="email" className='form-label'>
              Email
              <input type="text" className='form-control' name="email" id="email" placeholder='example@example.com' required={true} onChange={handleChange}/>
            </label>
            <label htmlFor="password" className='form-label'>
              Password
              <input type="password" className='form-control' name="password" id="password" placeholder='******' required={true} onChange={handleChange}/>
            </label>
            <div >
              <button className="btn btn-primary btn-lg w-100">Register</button>
              <hr />
              <Link to={"/"} className="btn btn-success btn-lg w-100">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register