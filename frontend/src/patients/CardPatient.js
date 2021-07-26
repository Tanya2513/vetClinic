import {
    useParams,
    useHistory
} from "react-router-dom";
import {useEffect, useState} from "react";

function CardPatient() {
    let { id } = useParams();


    const {push} = useHistory();
    const [patient, setPatient] = useState({
        name: "",
        age: "",
        species: "",
        diagnosis: "",
        visitDate: "",
    });

    useEffect(() => {
        fetch('http://localhost:5000/patient/'+ id).then(async (response) => {
            setPatient(await response.json());
        })
    }, [id])

    function deleteCard(){

        return fetch('http://localhost:5000/patient/' + id, {
            method: 'DELETE',
        }).then(async function (response)  {
          const responseObject = await response.json();
            if (responseObject.success == true){
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

    return (
       <div>
           <div>
           {patient.name}
           {patient.age}
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
       </div>

    );
}

export default CardPatient;
