import {logOut} from './navbar';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
            <div className="container">
                <a className="navbar-brand fw-bold" href="/invitations">NEXTIA</a>
                <div className="d-flex">
                    <button className="btn btn-primary" onClick={logOut}>Logout</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar