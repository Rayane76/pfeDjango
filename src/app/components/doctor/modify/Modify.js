import DeleteIcon from '@mui/icons-material/Delete';
import "../../../styles/doctor/patient/modify.css"
import ModifyTitleSvg from '@/app/utils/svg/modifyTitle';

export default function Modify(){
    return(
        <div className='modifyDiv'>
           <div className='modifyDivTitleDiv'>
           <ModifyTitleSvg />
           <h1 className='modifyDivTitle'>Modifier les informations</h1>
           </div>
        </div>
    )
}