import { Link } from 'react-router-dom'

function ErrorPage() {
  const namePage = location.href.split("/")
  return (
    <div className='container vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1>Error 404</h1>
      <h4>Page /{namePage[3]} not found!</h4>
      <Link to={"/"}>Back to login</Link>
    </div>
  )
}

export default ErrorPage