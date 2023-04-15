import {useState, useEffect} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";
import fetcher from "../fetcher";
import Button from "react-bootstrap/Button";
import {Col, Form, Row} from "react-bootstrap";
import API_URL from "../constant";

function CreatePatient() {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState('');
    const [breed, setBreed] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [animalOwner, setAnimalOwner] = useState('');
    const [numberOwner, setNumberOwner] = useState('');

    const {push} = useHistory();

    function save(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthDate', birthDate);
        formData.append('speciesId', speciesId);
        formData.append('breed', breed);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('animalOwner', animalOwner);
        formData.append('numberOwner', numberOwner);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher(API_URL + '/patient/', {
            method: 'POST',
            body: data,
        }).then(async function (response) {
            if (response.success == true) {
                alert("Карту додано")
                push('/list/');

            } else {
                alert("Помилка")
            }
        })

    }

    const [speciesList, setSpeciesList] = useState([]);

    useEffect(() => {
        fetcher(API_URL + '/species').then(async (answer) => {
            setSpeciesList(answer);
            let firstElement = answer[0];
            setSpeciesId(firstElement.id);
        })
    }, [])

    function optionChange(event) {
        setSpeciesId(event.target.value);
    }

    function itemToOption(item) {
        console.log(item);
        return <option value={item.id} key={item.id}>{item.type}</option>;
    }

    let optionList = speciesList.map(itemToOption);


    return (
        <div>
            <h1 className="name-card">Створення картки нового пацієнта</h1>
            <Form onSubmit={save}>
                <Col>
                    <label className="name-input"> Ім'я </label>
                    <Input className="form-card" type="text" name="name" required="required"
                           setter={setName}/>
                </Col>
                <Col>
                    <label className="name-input"> Дата народження </label>
                    <Input className="form-card" type="date" name="birthDate" required="required"
                           placeholder={"дата народження"} setter={setBirthDate}/>
                </Col>
                <Col>
                    <label className="name-input"> Вид </label>
                    <Form.Select className="form-card" aria-label="Default select example" onChange={optionChange}
                                 name="speciesId" size="1">
                        {optionList}
                    </Form.Select>
                </Col>
                <Col>
                    <label className="name-input"> Порода </label>
                    <Input className="form-card" type="text" name="breed" required="required"
                            setter={setBreed}/>
                </Col>
                <Col>
                    <label className="name-input"> Діагноз </label>
                    <Input className="form-card" type="text" name="diagnosis"
                           setter={setDiagnosis}/>
                </Col>
                <Col>
                    <label className="name-input"> Дата візиту </label>
                    <Input className="form-card" type="date" name="visitDate"
                           setter={setVisitDate}/>
                </Col>
                <Col>
                    <label className="name-input"> ПІБ власника </label>
                    <Input className="form-card" type="text" name="animalOwner" required="required"
                            setter={setAnimalOwner}/>
                </Col>
                <Col>
                    <label className="name-input"> Номер власника </label>
                    <Input className="form-card" type="text" name="numberOwner" required="required"
                            setter={setNumberOwner}/>
                </Col>
                <Button className="button-card" variant="secondary" type={"submit"}> Зберегти</Button>
            </Form>
        </div>
    );
}

export default CreatePatient;
