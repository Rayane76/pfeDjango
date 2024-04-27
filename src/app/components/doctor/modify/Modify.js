import DeleteIcon from '@mui/icons-material/Delete';

export default function Modify(){
    return(
        <div>
            <div className="modifyAllergies">
            <h4>Allergies :</h4>
            <ul>
                  <li className="allergie">Cow’s milk <DeleteIcon /></li>
                  <li className="allergie">Eggs <DeleteIcon /></li>
                  <li className="allergie">Tree nuts <DeleteIcon /></li>
                  <li className="allergie">Peanuts <DeleteIcon /></li>
             </ul>     
            </div>
            <div className="antFamiliaux">

            </div>
            <div className="antPersonnels">

            </div>
        </div>
    )
}