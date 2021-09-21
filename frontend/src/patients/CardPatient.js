import {
    useParams,
    useHistory
} from "react-router-dom";
import {useEffect, useState} from "react";
import fetcher from "../fetcher";

function CardPatient() {
    let { id } = useParams();


    const {push} = useHistory();
    const [patient, setPatient] = useState({
        name: "",
        birthDate: "",
        species: "",
        diagnosis: "",
        visitDate: "",
    });

    useEffect(() => {
        fetcher('http://localhost:5000/patient/'+ id).then(async (response) => {
            setPatient( response);
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
           {patient.species}
           {patient.diagnosis}
           {patient.visitDate}
           </div>
           <button onClick={deleteCard}>
               Удалить карту
           </button>
           <button onClick={editCard}>
               Редактировать карту
           </button>
           <button onClick={hospitalizePatient}>
               Госпитализировать
           </button>
           <button onClick={dischargePatient}>
               Выписка пациента
           </button>
       </div>

    );
}

export default CardPatient;
