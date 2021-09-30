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
           <div>
           {patient.name}
           {patient.birthDate}
           {patient.speciesId}
           {patient.diagnosis}
           {patient.visitDate}
           {patient.dateIn}
           {patient.dateOut}
           {patient.room}
           </div>
           <Button variant="secondary" onClick={deleteCard}>
               Удалить карту
           </Button>
           <Button variant="secondary" onClick={editCard}>
               Редактировать карту
           </Button>
           <Button variant="secondary" onClick={hospitalizePatient}>
               Госпитализировать
           </Button>
           <Button variant="secondary" onClick={dischargePatient}>
               Выписка пациента
           </Button>
       </div>

    );
}

export default CardPatient;
