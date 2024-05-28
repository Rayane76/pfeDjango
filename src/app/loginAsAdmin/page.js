'use client'
import { useState } from "react"
import "../styles/log.css"
import { useRouter } from "next/navigation"
import axios from "axios"
import {signIn} from "next-auth/react"
import { getSession } from "next-auth/react"


export default function LoginAsAdmin(){
    const router = useRouter()

    const [data,setData] = useState({
        password:"",
        role: "",
        carte_id: "",
        email: ""
    })

    const handleInput = (e) => {
        setData((prev)=>({...prev,[e.target.name]:e.target.value}));
    }

    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            if(data.role === "medecin"){
            const res = await signIn("credentials",{
                carte_id: data.carte_id,
                password: data.password,
                user : data.role,
                redirect: false
            })
            if(res.error){
                console.log("invalid credentials")
            }
            else{
                router.push("/admin/doctor");
            }
        }
          else{
            const res = await signIn("credentials",{
                email: data.email,
                password: data.password,
                user : data.role,
                redirect: false
            })
            if(res.error){
                console.log("invalid credentials")
            }
            else{
                const session = await getSession();
                if(session.user.role === "L"){
                    router.push("/admin/labo");
                }
                else{
                    router.push("/admin/centre");
                }
            }
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
            <label className="label">Choisir specialite : </label>
            <select required name="role" value={data.role} className="input" onChange={(e)=>{setData({password:"",role: e.target.value,carte_id:"",email:""})}}>
            <option value="" hidden>Choisir specialite : </option>
            <option value="medecin">Medecin</option>
            <option value="labo">Laboratoire d'analyses</option>
            <option value="centre">Centre d'imagerie</option>
          </select>
            </div>
            {data.role === "medecin" ?
            <>
            <div className="oneInputDiv">
            <label className="label">Numero carte nationale : </label>
            <input value={data.carte_id} onChange={(e)=>handleInput(e)} name="carte_id" required className="input" />
            </div>
            <div className="oneInputDiv">
            <label className="label">Mot de passe : </label>
            <input value={data.password} onChange={(e)=>handleInput(e)} type="password" name="password" required className="input" />
            </div>
            </>
             : data.role != "" ? <>
             <div className="oneInputDiv">
            <label className="label">Email : </label>
            <input type="email" value={data.email} onChange={(e)=>handleInput(e)} name="email" required className="input" />
            </div>
            <div className="oneInputDiv">
            <label className="label">Mot de passe : </label>
            <input value={data.password} onChange={(e)=>handleInput(e)} type="password" name="password" required className="input" />
            </div>
             </> : ""}
           </div>


           <div className="d-flex justify-content-center">
            <button type="submit" className="continuerBtn">Se connecter</button>
           </div>
           </form>
        </div>
    )
}