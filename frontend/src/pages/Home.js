import React from "react";
import CustemerService from "../CourseServices/productManagement";

export default function Home(props) {
 const handleLogin = () => {
   console.log("hello")
  CustemerService.LoginAndSignup().then((res)=> {
    console.log(res.data)
  }).catch(err => console.log(err))
 }

  return (
    <div className="container mt-3">
      <div className="text-center">
        <div className="ms-2">Login or Signup</div>
        <div>
          <a href="http://localhost:4001/google/" onClick={(e) => {
            handleLogin()
          }}>Google</a>
        </div>
      </div>
    </div>
  );
}
