import {useState} from "react";
import Input from "./form/Input";
import {useHistory} from "react-router-dom";

function CreatePatient() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [species, setSpecies] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [date, setDate] = useState('');
    const {push} = useHistory();

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('species', species);
        formData.append('diagnosis', diagnosis);
        formData.append('date', date);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetch('http://localhost:5000/patient/', {
            method: 'POST',
            body: data,
        }).then(async function(response) {
            const responseObject = await response.json();
            if (responseObject.success == true){
                alert("Добавлено карту")
                push('/list/');

            } else {
                alert("Ошибка")
            }
        })

    }


    return (
        <div>
            <form>
                <Input type="text" name="name" placeholder={"ім'я"} setter={setName}/>
                <Input type="text" name="age" placeholder={"вік"} setter={setAge}/>
                <Input type="text" name="species" placeholder={"вид"} setter={setSpecies}/>
                <Input type="text" name="diagnosis" placeholder={"діагноз"} setter={setDiagnosis}/>
                <Input type="text" name="date" placeholder={"дата"} setter={setDate}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default CreatePatient;
