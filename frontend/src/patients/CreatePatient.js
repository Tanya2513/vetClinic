import {useState,useEffect} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";
import fetcher from "../fetcher";

function CreatePatient() {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const {push} = useHistory();

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthDate', birthDate);
        formData.append('speciesId', speciesId);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/patient/', {
            method: 'POST',
            body: data,
        }).then(async function(response) {
            if (response.success == true){
                alert("Добавлено карту")
                push('/list/');

            } else {
                alert("Ошибка")
            }
        })

    }
    const[speciesList, setSpeciesList]=useState([]);

    useEffect(() => {
        fetcher('http://localhost:5000/species').then(async (answer) => {
            setSpeciesList(answer);
            let firstElement = answer[0];
            setSpeciesId(firstElement.id);
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
                <Input type="date" name="birthDate" placeholder={"дата народження"} setter={setBirthDate}/>
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
