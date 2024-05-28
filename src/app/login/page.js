'use client'
import { useEffect, useState } from "react"
import "../styles/log.css"
import { useRouter } from "next/navigation"
import axios from "axios"
import {signIn} from "next-auth/react"
import { getSession } from "next-auth/react"


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
        e.preventDefault();
        try {
            const res = await signIn("credentials",{
                carte_id: data.id,
                password: data.password,
                user : "patient",
                redirect: false
            })
            if(res.error){
                console.log("invalid credentials")
            }
            else{
              const session = await getSession();
              router.push("/account/" + session.user.id);
            }
        } catch (error) {
            console.log(error)
        }
        // e.preventDefault()
        // await axios
        // .post("http://127.0.0.1:8000/api/login/",data)
        // .then((res)=>{
        //     localStorage.setItem("auth",JSON.stringify({
        //         id:res.data.id,
        //         refresh:res.data.refresh,
        //         access:res.data.access,
        //         role:res.data.role
        //     }))
        //     router.push('/account/' + res.data.id)
        // })
        // .catch((err)=>{
        //     console.log('err',err)
        // })

    }


    return(
        
        <div className="logPage">
           <h1 className="ttl">Connexion</h1>
           <form onSubmit={(e)=>handleSubmit(e)} style={{width:"100%"}}>
           <div className="inputStep">
            <div className="oneInputDiv">
            <label className="label">Numero carte nationale : </label>
            <input onChange={(e)=>handleInput(e)} name="id" required className="input" />
            </div>
            <div className="oneInputDiv">
            <label className="label">Mot de passe : </label>
            <input onChange={(e)=>handleInput(e)} type="password" name="password" required className="input" />
            </div>

            <a href="/loginAsAdmin" className="cnt">Docteur/labo ? Connecter vous ici</a>
           </div>


           <div className="d-flex justify-content-center">
            <button type="submit" className="continuerBtn">Se connecter</button>
           </div>
           </form>
        </div>
    )
}