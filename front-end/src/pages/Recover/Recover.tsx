import swal from 'sweetalert'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendRequest } from '../../services/request'

function Recover() {

  const [dataForm, setDataForm] = useState({email: "", newPassword: ""})

  const handleChange = (e:any) => {
    setDataForm({...dataForm, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    const dataReq = await sendRequest('recover','POST',dataForm)

    if(dataReq.error === true){
      swal("Error!", `${dataReq.data || dataReq.message}`, "error")
    }

    if(dataReq.error === false && dataReq.data === "Password updated"){
      swal("Password updated", "","success")
    }
  }

 return (
      <div className='container vh-100 d-flex justify-content-center align-items-center'>
        <div className="card p-4 shadow p-3 mb-5 bg-body rounded" style={{ width: "18rem" }}>
          <div className="cart-body">
            <h1 className="card-title text-center">
              NEXTIA
              <span className='d-block text-center text-muted fs-6'>Recover password</span>
            </h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className='form-label'>
                Email
                <input type="text" className='form-control' name="email" id="email" placeholder='example@example.com' required={true} onChange={handleChange}/>
              </label>
              <label htmlFor="newPassword" className='form-label'>
                New password
                <input type="password" className='form-control' name="newPassword" id="newPassword" placeholder='******' required={true} onChange={handleChange}/>
              </label>
              <div >
                <button className="btn btn-primary btn-lg w-100">Update password</button>
                <hr />
                <Link to={"/"} className="btn btn-success btn-lg w-100">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Recover