import {
    useParams
} from "react-router-dom";
import {useEffect, useState} from "react";

function CardPatient() {
    let { id } = useParams();

    const [patient, setPatient] = useState({
        name: "",
        age: "",
    });

    useEffect(() => {
        fetch('http://localhost:5000/patient/'+ id).then(async (response) => {
            setPatient(await response.json());
        })
    }, [id])



    return (
       <div>
           {patient.name}


       </div>
    );
}

export default CardPatient;
