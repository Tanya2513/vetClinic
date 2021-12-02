import {
    useParams,
    useHistory
} from "react-router-dom";
import {useEffect, useState} from "react";
import fetcher from "../fetcher";
import Button from "react-bootstrap/Button";

function CardSpecies() {
    let {id} = useParams();


    const {push} = useHistory();
    const [species, setSpecies] = useState({
        type: "",
        description: "",
        features: "",
    });

    useEffect(() => {
        fetcher('http://localhost:5000/species/' + id).then(async (response) => {
            setSpecies(response);
        })
    }, [id])

    function deleteCard() {

        return fetcher('http://localhost:5000/species/' + id, {
            method: 'DELETE',
        }).then(async function (responseObject) {
            if (responseObject.success == true) {
                alert("Карту видалено")
                push('/list/');

            } else if (responseObject.success == false) {
                alert(responseObject.message)
            } else {
                alert("Помилка")
            }
        })
    }

    function editCard() {
        push('/editSpecies/' + id);
    }

    return (
        <div>
            <h1>{species.type}</h1>
            <div>
                <ul className="card-patient">
                    <li>
                        Опис: {species.description}
                    </li>
                    <li>
                        Особливості: {species.features}
                    </li>
                </ul>
            </div>
            <Button className="button" variant="secondary" onClick={deleteCard}>
                Видалити карту
            </Button>
            <Button className="button" variant="secondary" onClick={editCard}>
                Редагувати карту
            </Button>
        </div>

    );
}

export default CardSpecies;
