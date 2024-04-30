import "../../../styles/doctor/patient/historique.css"
import HistoriqueSvg from "@/app/utils/svg/historique"


export default function History(){
    return(
        <div className="historiqueDiv">
            <div className='historiqueDivTitleDiv'>
           <HistoriqueSvg />
           <h1 className='historiqueDivTitle'>Historique</h1>
           </div>
        </div>
    )
}