'use client'
import { useRouter } from "next/navigation";
import "../../../styles/homePage/hero.css"
import Button from 'react-bootstrap/Button';

export default function Hero(){
    const router = useRouter();
    return(
        <>
            <div className="hero">
              <div className="descImageDiv">
                 <div className="descLogDiv">
                    <h1>Plateforme de gestion médicale algérienne</h1>
                    <div className="logBtnsDiv">
                       <a href="/register"><Button variant="primary" className="btn">S'inscrire</Button></a>
                       <a href="/scan"><Button variant="secondary" className="btn">Scan</Button></a>
                    </div>
                 </div>
                 <div>
                    <img src="/home.png" className="imgHome"></img>
                 </div>
                 <div>
   
                 </div>
              </div>
           </div>
      </>
    )
}