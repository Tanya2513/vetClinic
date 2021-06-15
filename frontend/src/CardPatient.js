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
        date: "",
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

    return (
       <div>
           <div>
           {patient.name}
           {patient.age}
           {patient.species}
           {patient.diagnosis}
           {patient.date}
           </div>
           <button onClick={deleteCard}>
               Удалить карту
           </button>
       </div>

    );
}

export default CardPatient;
