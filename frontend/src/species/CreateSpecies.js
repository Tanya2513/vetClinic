import {useState} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";

function CreateSpecies() {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const {push} = useHistory();

    function save() {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('features', features);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetch('http://localhost:5000/species/', {
            method: 'POST',
            body: data,
        }).then(async function(response) {
            const responseObject = await response.json();
            if (responseObject.success == true){
                alert("Добавлено карту")
                push('/list_species/');

            } else {
                alert("Ошибка")
            }
        })

    }


    return (
        <div>
            <form>
                <Input type="text" name="type" placeholder={"вид"} setter={setType}/>
                <Input type="text" name="description" placeholder={"опис"} setter={setDescription}/>
                <Input type="text" name="features" placeholder={"особливості"} setter={setFeatures}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default CreateSpecies;
