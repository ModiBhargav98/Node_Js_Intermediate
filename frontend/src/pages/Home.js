import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(props) {
  return (
    <div className="container mt-3">
        <div className="d-flex justify-content-end">
           <button className="btn btn-info text-white"><Link to="/login">LogIn</Link></button>
           <button className="btn btn-info text-white mx-2"><Link to="/login">SignUp</Link></button>
           <button className="btn btn-info text-white mx-2"><Link to="/uploadeFile">UploadeFile</Link></button>
           <button className="btn btn-info text-white mx-2"><Link to="/productData">Products</Link></button>
        </div>
    </div>
  )
}
