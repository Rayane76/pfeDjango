import "../../styles/doctor/home.css";
import Scanner from "@/app/components/scanner/Scanner";

export default function Doctor() {

  return (
    <>
      <div>
        <div className="homeDiv">
        <form>
          <label>
            Entrer Matricule du patient : 
          </label>
          <input placeholder="matricule ..." required></input>
          <br></br>
          <label>Ou bien scanner le code QR : </label>
          <br></br>
          </form>
          <Scanner />
        </div>
      </div>
    </>
  );
}
