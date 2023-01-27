import { useState } from 'react'
import swal from 'sweetalert';
import Navbar from '../../components/Navbar/Navbar'
import {sendRequest} from '../../services/request'


function AddInvitation() {

    const [dataForm , setDataForm] = useState({guestName: '', entryTime: '', expiredInvitation: ''})
    
    const handleChange = (e: any) => {
        //SAVE THE INFORMATION OBTAINED FORM THE FORM
        setDataForm({...dataForm, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e:any) => {
        e.preventDefault()
        const resReq = await sendRequest('addInvitation','POST',dataForm)

        if(resReq.error === true){
            swal("Error!", `${resReq.data || resReq.message}`, "error")
        }
        
        if(resReq.error === false && resReq.message === "Invitation saved"){
            swal("Invitation saved", "\n","success",{buttons: [false]})
            setDataForm({guestName: '', entryTime: '', expiredInvitation: ''})
            setTimeout(() => window.location.href = '/invitations', 1000);
          }
    }

    return (
        <>
            <Navbar />
            <div className='container vh-100 d-flex justify-content-center align-items-center'>
                <div className="card p-4 shadow p-3 mb-5 bg-body rounded" style={{ width: "18rem" }}>
                    <div className="cart-body">
                        <h1 className="card-title text-center">
                            NEXTIA
                            <span className='d-block text-center text-muted fs-6'>Add invitation</span>
                        </h1>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="guestName" className='form-label'>
                                Name
                                <input type="text" className='form-control' name="guestName" id="guestName" placeholder='Jonh' required={true} onChange={handleChange} value={dataForm.guestName}/>
                            </label>
                            <label htmlFor="entryTime" className='form-label'>
                                Entry time
                                <input type="datetime-local" className='form-control' name="entryTime" id="entryTime" required={true} onChange={handleChange} value={dataForm.entryTime}/>
                            </label>
                            <label htmlFor="expiredInvitation" className='form-label'>
                                Expired invitation
                                <input type="datetime-local" className='form-control' name="expiredInvitation" id="expiredInvitation" required={true} onChange={handleChange} value={dataForm.expiredInvitation}/>
                            </label>
                            <div >
                                <button className='btn btn-success w-100'>Add invitation</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddInvitation