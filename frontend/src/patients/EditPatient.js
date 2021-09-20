import {useEffect, useState} from "react";
import Input from "../form/Input";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";

//компонент
function EditPatient() {
    //вызывается useState с initialValue, возвращает масив из 2х елементов
    //мы деструктуризируем их и даем названия name, setName
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState(undefined);
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/patient/' + id).then(async (response) => {
             const responseObject = await response.json();
             setName(responseObject.name);
             setBirthDate(responseObject.birthDate);
             setSpeciesId(responseObject.speciesId);
             setDiagnosis(responseObject.diagnosis);
             setVisitDate(responseObject.visitDate);
        })
    }, [id]);

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthDate', birthDate);
        formData.append('speciesId', speciesId);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('id', id);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/patient/' + id, {
            method: 'PUT',
            body: data,
        }).then(async function (responseObject) {
            if (responseObject.success == true) {
                alert("Изменения внесены")
                push('/patient/' + id);

            } else {
                alert("Ошибка")
            }
        })

    }

    const[speciesList, setSpeciesList]=useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/species').then(async (response) => {
            let answer = await response.json()
            setSpeciesList(answer);
        })
    }, [])

    function optionChange(event){
        setSpeciesId(event.target.value);
    }

    function itemToOption(item){
        return <option value={item.id} key={item.id}>{item.type}</option>;
    }

    let optionList = speciesList.map(itemToOption);
    return (
        <div>
            <form>
                <Input type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                <Input type="text" name="birthDate" value={birthDate} placeholder={"дата народження"} setter={setBirthDate}/>
                <p>
                    <select onChange={optionChange} name="speciesId" size="1" value={speciesId}>
                        {optionList}
                    </select>
                </p>
                <Input type="text" name="diagnosis" value={diagnosis} placeholder={"діагноз"} setter={setDiagnosis}/>
                <Input type="text" name="visitDate" value={visitDate} placeholder={"дата"} setter={setVisitDate}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default EditPatient;

