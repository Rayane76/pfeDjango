'use client'
import "../styles/register.css"


export default function LoginAsAdmin(){
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
                        <button className="next">Submit</button>
                    </div>
                    </div>
                    </form>
                    </div>
        </div>
        </>
    )
}