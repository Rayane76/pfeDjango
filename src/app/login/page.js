'use client'
import "../styles/register.css"
import Navbar from "../components/navbar/Navbar"
import { useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function Login(){
    const router = useRouter()

    const [data,setData] = useState({
        id:"",
        password:""
    })

    const handleInput = (e) => {
        setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        console.log("DATA",data)
        axios
        .post("http://127.0.0.1:8000/api/login/",data)
        .then((res)=>{
            localStorage.setItem("auth",JSON.stringify({
                id:res.data.id,
                refresh:res.data.refresh,
                access:res.data.access,
                role:res.data.role
            }))

            router.push('/')


        })
        .catch((err)=>{
            console.log('err',err.request.response)
        })

    }
    return(
        <>
          <Navbar />
          <div className="container">
        <header>Sign Up</header>
        <div className="form-outer">
            <form action="#">
                <div className="slide">
                    <div className="field">
                        <div className="label">Matricule</div>
                        <input type="text" name="id" onChange={(e)=>handleInput(e)} />
                    </div>
                    <div className="field">
                        <div className="label">Password</div>
                        <input type="password" name="password" onChange={(e)=>handleInput(e)}/>
                    </div>
                    <div>
                        <div className="label">Don't have an account ? <a href="/register">Register</a></div>
                    </div>
                    <div className="field">
                        <button className="next" onClick={(e) => handleSubmit(e)}>Submit</button>
                    </div>
                    <div>
                    <div className="label">Doctor or Labo ? <a href="/loginAsAdmin">Login here</a></div>
                    </div>
                    </div>
                    </form>
                    </div>
        </div>
        </>
    )
}