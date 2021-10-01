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
    const [diagnosis, setDiagnosis] = useState('');
    const [visitDate, setVisitDate] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetcher('http://localhost:5000/patient/' + id).then(async (response) => {
             const responseObject = response;
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
            if (responseObject.success === true) {
                alert("Изменения внесены")
                push('/patient/' + id);

            } else {
                alert("Ошибка")
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
                    <Input className="form-card" type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                </Col>
                <Col>
                    <Input className="form-card" type="text" name="birthDate" value={birthDate} placeholder={"дата народження"} setter={setBirthDate}/>

                </Col>
                <Col>
                    <Form.Select className="form-card" aria-label="Default select example" onChange={optionChange} name="speciesId" size="1" value={speciesId}>
                        {optionList}
                    </Form.Select>
                </Col>
                <Col>
                    <Input className="form-card" type="text" name="diagnosis" value={diagnosis} placeholder={"діагноз"} setter={setDiagnosis}/>

                </Col>
                <Col>
                    <Input className="form-card" type="text" name="visitDate" value={visitDate} placeholder={"дата"} setter={setVisitDate}/>
                </Col>
                <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
            </Form>
        </div>
    );
}

export default EditPatient;

