import {useState,useEffect} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";
import fetcher from "../fetcher";
import Button from "react-bootstrap/Button";
import {Col, Form, Row} from "react-bootstrap";

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
            <h1 className="name-card">Створення картки нового пацієнта</h1>
            <Form>

                    <Col>
                        <Input className="form-card" type="text" name="name" placeholder={"ім'я"} setter={setName}/>
                    </Col>
                    <Col>
                        <Input className="form-card" type="date" name="birthDate" placeholder={"дата народження"} setter={setBirthDate}/>
                    </Col>
                    <Col>
                        <Form.Select className="form-card" aria-label="Default select example" onChange={optionChange} name="speciesId" size="1" >
                            {optionList}
                        </Form.Select>
                    </Col>
                <Col>
                    <Input className="form-card" type="text" name="diagnosis" placeholder={"діагноз"} setter={setDiagnosis}/>
                </Col>
                <Col>
                    <Input className="form-card" type="date" name="visitDate" placeholder={"дата"} setter={setVisitDate}/>
                </Col>

                <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
            </Form>
        </div>
    );
}

export default CreatePatient;
