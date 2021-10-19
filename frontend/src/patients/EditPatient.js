import {useEffect, useState} from "react";
import Input from "../form/Input";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

//компонент
function EditPatient() {
    //вызывается useState с initialValue, возвращает масив из 2х елементов
    //мы деструктуризируем их и даем названия name, setName
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState(undefined);
    const [breed, setBreed] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [animalOwner, setAnimalOwner] = useState('');
    const [numberOwner, setNumberOwner] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetcher('http://localhost:5000/patient/' + id).then(async (response) => {
             const responseObject = response;
             setName(responseObject.name);
             setBirthDate(responseObject.birthDate);
             setSpeciesId(responseObject.speciesId);
             setBreed(responseObject.breed);
             setDiagnosis(responseObject.diagnosis);
             setVisitDate(responseObject.visitDate);
             setAnimalOwner(responseObject.animalOwner);
             setNumberOwner(responseObject.numberOwner);
        })
    }, [id]);

    function save() {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('birthDate', birthDate);
        formData.append('speciesId', speciesId);
        formData.append('breed', breed);
        formData.append('diagnosis', diagnosis);
        formData.append('visitDate', visitDate);
        formData.append('animalOwner', animalOwner);
        formData.append('numberOwner', numberOwner);
        formData.append('id', id);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/patient/' + id, {
            method: 'PUT',
            body: data,
        }).then(async function (responseObject) {
            if (responseObject.success === true) {
                alert("Зміни внесено")
                push('/patient/' + id);

            } else {
                alert("Помилка")
            }
        })

    }


    const[speciesList, setSpeciesList]=useState([]);

    useEffect(() => {
        fetcher('http://localhost:5000/species').then(async (response) => {
            setSpeciesList(response);
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
            <h1>Редагування картки пацієнта</h1>
            <Form>
                <Col>
                    <label className="name-input"> Ім'я </label>
                    <Input className="form-card" type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                </Col>
                <Col>
                    <label className="name-input"> Дата народження </label>
                    <Input className="form-card" type="text" name="birthDate" value={birthDate} placeholder={"дата народження"} setter={setBirthDate}/>
                </Col>
                <Col>
                    <label className="name-input"> Вид </label>
                    <Form.Select className="form-card" aria-label="Default select example" onChange={optionChange} name="speciesId" size="1" value={speciesId}>
                        {optionList}
                    </Form.Select>
                </Col>
                <Col>
                    <label className="name-input"> Порода </label>
                    <Input className="form-card" type="text" name="breed" value={breed} placeholder={"порода"} setter={setBreed}/>
                </Col>
                <Col>
                    <label className="name-input"> Діагноз </label>
                    <Input className="form-card" type="text" name="diagnosis" value={diagnosis} placeholder={"діагноз"} setter={setDiagnosis}/>
                </Col>
                <Col>
                    <label className="name-input"> Дата візиту </label>
                    <Input className="form-card" type="text" name="visitDate" value={visitDate} placeholder={"дата"} setter={setVisitDate}/>
                </Col>
                <Col>
                    <label className="name-input"> ПІБ власника </label>
                    <Input className="form-card" type="text" name="animalOwner" value={animalOwner} placeholder={"власник тварини"} setter={setAnimalOwner}/>
                </Col>
                <Col>
                    <label className="name-input"> Номер власника </label>
                    <Input className="form-card" type="text" name="numberOwner" value={numberOwner} placeholder={"номер власника"} setter={setNumberOwner}/>
                </Col>
                <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
            </Form>
        </div>
    );
}

export default EditPatient;

