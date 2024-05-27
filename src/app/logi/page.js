'use client'
import { useState } from "react"
import "../styles/log.css"
import { useRouter } from "next/navigation"
import axios from "axios"


export default function Log(){
    const router = useRouter()

    const [data,setData] = useState({
        id:"",
        password:""
    })

    const handleInput = (e) => {
        setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        await axios
        .post("http://127.0.0.1:8000/api/login/",data)
        .then((res)=>{
            localStorage.setItem("auth",JSON.stringify({
                id:res.data.id,
                refresh:res.data.refresh,
                access:res.data.access,
                role:res.data.role
            }))
            router.push('/account/' + res.data.id)
        })
        .catch((err)=>{
            console.log('err',err)
        })

    }


    return(
        
        <div className="logPage">
           <h1 className="ttl">Connexion</h1>
           <form onSubmit={(e)=>handleSubmit(e)} style={{width:"100%"}}>
           <div className="inputStep">
            <div className="oneInputDiv">
            <label className="label">Matricule : </label>
            <input onChange={(e)=>handleInput(e)} name="id" required className="input" />
            </div>
            <div className="oneInputDiv">
            <label className="label">Mot de passe : </label>
            <input onChange={(e)=>handleInput(e)} type="password" name="password" required className="input" />
            </div>

            <a href="/" className="cnt">Docteur/labo ? Connecter vous ici</a>
           </div>


           <div className="d-flex justify-content-center">
            <button type="submit" className="continuerBtn">Se connecter</button>
           </div>
           </form>
        </div>
    )
}