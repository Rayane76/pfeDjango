import "../styles/log.css"


export default function Log(){
    return(
        <div className="logPage">
           <h1 className="ttl">Connexion</h1>
           <div className="inputStep">
            <div className="oneInputDiv">
            <label className="label">Matricule : </label>
            <input required name="last_name" className="input" />
            </div>
            <div className="oneInputDiv">
            <label className="label">Mot de passe : </label>
            <input required name="last_name" className="input" />
            </div>

            <a href="/" className="cnt">Docteur/labo ? Connecter vous ici</a>
           </div>


           <div className="d-flex justify-content-center">
            <button className="continuerBtn">Se connecter</button>
           </div>
        </div>
    )
}