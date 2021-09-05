import {useState,useEffect} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";

function CreatePatient() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [speciesId, setSpeciesId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const {push} = useHistory();

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('speciesId', speciesId);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);

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
        console.log(item);
        return <option value={item.id} key={item.id}>{item.type}</option>;
    }

    let optionList = speciesList.map(itemToOption);


    return (
        <div>
            <form>
                <Input type="text" name="name" placeholder={"ім'я"} setter={setName}/>
                <Input type="text" name="age" placeholder={"вік"} setter={setAge}/>
                <p>
                    <select onChange={optionChange} name="speciesId" size="1" >
                        {optionList}
                    </select>
                </p>
                <Input type="text" name="diagnosis" placeholder={"діагноз"} setter={setDiagnosis}/>
                <Input type="text" name="visitDate" placeholder={"дата"} setter={setVisitDate}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default CreatePatient;
