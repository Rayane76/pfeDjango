'use client'
import "../styles/register.css"
import Navbar from "../components/navbar/Navbar"

export default function Login(){
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
                        <input type="text" />
                    </div>
                    <div className="field">
                        <div className="label">Password</div>
                        <input type="password" />
                    </div>
                    <div>
                        <div className="label">Don't have an account ? <a href="/register">Register</a></div>
                    </div>
                    <div className="field">
                        <button className="next">Submit</button>
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