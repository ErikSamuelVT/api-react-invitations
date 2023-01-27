import swal from 'sweetalert';
import { Link } from 'react-router-dom'
import Qr from "../../components/Qr/Qr";
import { useEffect, useState } from "react"
import Navbar from '../../components/Navbar/Navbar'
import { sendRequest } from "../../services/request";

function Invitations() {
    const token = JSON.parse(localStorage.getItem('auth-token') || "[]")
    const [invitations, setInvitations] = useState([])

    useEffect(() => { getInvitations() }, [])

    const getInvitations = async () => {
        const resReq = await sendRequest('invitations', 'GET')
        setInvitations(resReq.data)
    }

    const deleteInvitation = async (_id: any) => {
        const resReq = await sendRequest("deleteInvitation", "DELETE", { idDoc: _id })
        if (resReq.error === false && resReq.message === "Document deleted") {
            swal("Document deleted", "\n", "success")
            console.log(invitations);
            setInvitations([...invitations.filter((invitation) => invitation._id !== _id)]);
        }
    }

    if (token.length === 0) {
        swal("Not exists token", "\n", "error", { buttons: [false] })
        setTimeout(() => { window.location.href = '/' }, 2 * 1000)
        return null
    } else {
        return (
            <>
                <Navbar />
                <div className='container vh-100 d-flex justify-content-center align-items-center'>
                    <div className="card p-4 shadow p-3 mb-5 bg-body rounded" style={{ width: "150rem" }}>
                        <div className="cart-body">
                            <div className="mb-3 d-flex justify-content-between">
                                <h6 className='fw-bold '>Invitations</h6>
                                <Link to={"/addInvitation"} className="btn btn-success">Add</Link>
                            </div>
                            <table className="table text-center">
                                <thead>
                                    <tr>
                                        <th className="text-center" scope="col">Guest Name</th>
                                        <th className="text-center" scope="col">Entry time</th>
                                        <th className="text-center" scope="col">Expired invitation</th>
                                        <th className="text-center" scope="col" colSpan={2}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        invitations.map((invitation: any,) => (
                                            <tr key={invitation._id}>
                                                <td>{invitation.guestName}</td>
                                                <td>{invitation.entryTime}</td>
                                                <td>{invitation.expiredInvitation}</td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => deleteInvitation(invitation._id)}>Delete</button>
                                                </td>
                                                <td>
                                                    <Qr invitation={invitation}/>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Invitations