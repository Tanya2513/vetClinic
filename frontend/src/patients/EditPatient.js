import {useEffect, useState} from "react";
import Input from "../form/Input";
import {useHistory, useParams} from "react-router-dom";

//компонент
function EditPatient() {
    const state = useState('');

    //вызывается useState с initialValue, возвращает масив из 2х елементов
    //мы деструктуризируем их и даем названия name, setName
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [species, setSpecies] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/patient/' + id).then(async (response) => {
             const responseObject = await response.json();
             setName(responseObject.name);
             setAge(responseObject.age);
             setSpecies(responseObject.species);
             setDiagnosis(responseObject.diagnosis);
             setVisitDate(responseObject.visitDate);
        })
    }, [id]);

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('species', species);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('id', id);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetch('http://localhost:5000/patient/' + id, {
            method: 'PUT',
            body: data,
        }).then(async function (response) {
            const responseObject = await response.json();
            if (responseObject.success == true) {
                alert("Изменения внесены")
                push('/patient/' + id);

            } else {
                alert("Ошибка")
            }
        })

    }


    return (
        <div>
            <form>
                <Input type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                <Input type="text" name="age" value={age} placeholder={"вік"} setter={setAge}/>
                <Input type="text" name="species" value={species} placeholder={"вид"} setter={setSpecies}/>
                <Input type="text" name="diagnosis" value={diagnosis} placeholder={"діагноз"} setter={setDiagnosis}/>
                <Input type="text" name="visitDate" value={visitDate} placeholder={"дата"} setter={setVisitDate}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default EditPatient;

