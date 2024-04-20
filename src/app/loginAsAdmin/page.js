'use client'
import { useRouter } from "next/navigation";
import "../styles/register.css"


export default function LoginAsAdmin(){

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();
        router.push("/admin/doctor")
    }


    return(
        <>
<div className="container">
        <header>Sign Up</header>
        <div className="form-outer">
            <form action="#">
                <div className="slide">
                    <div className="field">
                        <div className="label">Matricule</div>
                        <input type="text" />
                    </div>
                    <div className="field">
                        <div className="label">Password</div>
                        <input type="password" />
                    </div>
                    <div className="field">
                        <button type="sumbit" className="next" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                    </div>
                    </form>
                    </div>
        </div>
        </>
    )
}