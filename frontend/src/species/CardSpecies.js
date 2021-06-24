import {
    useParams,
    useHistory
} from "react-router-dom";
import {useEffect, useState} from "react";

function CardSpecies() {
    let { id } = useParams();


    const {push} = useHistory();
    const [species, setSpecies] = useState({
        type: "",
        description: "",
        features: "",
    });

    useEffect(() => {
        fetch('http://localhost:5000/species/'+ id).then(async (response) => {
            setSpecies(await response.json());
        })
    }, [id])

    function deleteCard(){

        return fetch('http://localhost:5000/species/' + id, {
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
        push('/editSpecies/' + id);
    }

    return (
       <div>
           <div>
           {species.type}
           {species.description}
           {species.features}
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

export default CardSpecies;