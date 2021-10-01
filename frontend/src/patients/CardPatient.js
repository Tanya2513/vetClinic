import {
    useParams,
    useHistory
} from "react-router-dom";
import {useEffect, useState} from "react";
import fetcher from "../fetcher";
import Button from 'react-bootstrap/Button';

function CardPatient() {
    let { id } = useParams();


    const {push} = useHistory();
    const [patient, setPatient] = useState({
        name: "",
        birthDate: "",
        species: "",
        diagnosis: "",
        visitDate: "",
        dateIn: "",
        dateOut: "",
        room: ""
    });

    useEffect(() => {
        fetcher('http://localhost:5000/patient/'+ id).then(async (response) => {
            setPatient(response);
        })
    }, [id])

    function deleteCard(){

        return fetcher('http://localhost:5000/patient/' + id, {
            method: 'DELETE',
        }).then(async function (response)  {
            if (response.success == true){
                alert("Удалено карту")
                push('/list/');

            } else {
                alert("Ошибка")
            }
        })
    }

    function editCard(){
        push('/edit/' + id);
    }

    function hospitalizePatient(){
        push('/hospitalize/' + id);
    }

    function dischargePatient(){
        push('/discharge/' + id)
    }

    return (
       <div>
           <h1>Карта пацієнта</h1>
           <div>
               <ul className="card-patient">
                   <li>Ім'я: {patient.name}</li>
                   <li>Дата народження: {patient.birthDate}</li>
                   <li>Вид: {patient.speciesId}</li>
                   <li>Діагноз: {patient.diagnosis}</li>
                   <li>Дата візиту: {patient.visitDate}</li>
                   <li>Дата госпіталізації до стаціонару: {patient.dateIn}</li>
                   <li>Дата виписки: {patient.dateOut}</li>
                   <li>Номер палати у стаціонарі: {patient.room}</li>
               </ul>
           </div>
           <Button className="button" variant="secondary" onClick={deleteCard}>
               Видалити карту
           </Button>
           <Button className="button" variant="secondary" onClick={editCard}>
               Редагувати карту
           </Button>
           <Button className="button" variant="secondary" onClick={hospitalizePatient}>
               Госпіталізувати пацієнта
           </Button>
           <Button className="button" variant="secondary" onClick={dischargePatient}>
               Виписати пацієнта
           </Button>
       </div>

    );
}

export default CardPatient;
