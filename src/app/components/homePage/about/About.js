import "../../../styles/homePage/about.css"

export default function About(){
    return(
        <>
            <div className="about">
               <div>
                 <img className="aboutImg" src="/about.jpg"></img>
               </div>
               <div className="infos">
                <h2 className="fml">Partagez l’essentiel de vos <br></br> informations de santé</h2>
                <p className="tx">Vous pouvez ajouter des informations sur :</p>
                <ul className="tx">
                    <li>Vos maladies et sujets de santé</li>
                    <li>Vos traitements</li>
                    <li>Vos allergies</li>
                    <li>Vos chirurgies</li>
                </ul>
                <p className="tx">Vous pouvez également partager votre profil avec les <br></br> professionnels de santé de votre choix avec votre matricule<br></br> ou bien votre code QR.</p>
               </div>
            </div>
        </>
    )
}