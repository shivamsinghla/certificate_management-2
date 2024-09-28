import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import cs from './image/reg.jfif'

export default function Adminlogin(){
    const navi = useNavigate()
    const[username,setUsername] = useState("");
    const[pass,setPass] = useState("");
    async function handler(e){
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("adminUsername",username)
        formdata.append("pass",pass)
        const result = await axios.post("http://localhost:3010/admincheck",formdata,{headers:{"Content-Type":"application/json;charset=UTF-8"}})
        const a = result.data.data
        if(a){
            console.log(a)
            alert("logged in successfully")
            navi("/admin")
        }
        else{
            alert("try again")
            navi("/admin-auth")
        }
    }
    return(
        <>
        <Header/>
        <section className='vh-100 mb-5 d-flex justify-content-center ' >
  <div className="container m-3 h-100">
    <div className="row d-flex align-items-center justify-content-center mb-5">
      <div className="col-md-8 col-lg-7 col-xl-6">
        <img src={cs} style={{'height':'100%'}}
          className="img-fluid" alt="Phone image"/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 py-5">
        <form onSubmit={handler}  >
         <h1>Login</h1>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="text" id="form1Example13" className="form-control form-control-lg" placeholder='enter Username' onChange={(e)=>setUsername(e.target.value)} name='phone' />
            <label className="form-label" for="form1Example13">Username</label>
          </div>

          <div data-mdb-input-init className="form-outline mb-4">
            <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='enter password' onChange={(e)=> setPass(e.target.value)} name='pass' />
            <label className="form-label" for="form1Example23">Password</label>
          </div>

          <input type="submit" data-mdb-button-init data-mdb-ripple-init className=" btn btn-dark btn-lg btn-block" value='Sign-in'></input>

        </form>
      </div>
    </div>
  </div>
</section>
<Footer/>
        </>
    )
};