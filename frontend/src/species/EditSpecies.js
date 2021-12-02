import {useEffect, useState} from "react";
import Input from "../form/Input";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

//компонент
function EditSpecies() {
    const state = useState('');

    //вызывается useState с initialValue, возвращает масив из 2х елементов
    //мы деструктуризируем их и даем названия name, setName
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetcher('http://localhost:5000/species/' + id).then(async (responseObject) => {
             setType(responseObject.type);
             setDescription(responseObject.description);
             setFeatures(responseObject.features);
        })
    }, [id]);

    function save() {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('features', features);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/species/' + id, {
            method: 'PUT',
            body: data,
        }).then(async function (responseObject) {
            if (responseObject.success == true) {
                alert("Зміни внесено")
                push('/species/' + id);

            } else {
                alert("Помилка")
            }
        })

    }


    return (
        <div>
            <h1>Редагувати інформацію про даний вид тварин</h1>
            <Form>
                <Col>
                    <Input className="form-card" type="text" name="type" value={type} placeholder={"вид"} setter={setType}/>

                </Col>
                <Col>
                    <Input className="form-card" type="text" name="description" value={description} placeholder={"опис"} setter={setDescription}/>
                </Col>
                <Col>
                    <Input className="form-card" type="text" name="features" value={features} placeholder={"особливості"} setter={setFeatures}/>
                </Col>
                <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
            </Form>
        </div>
    );
}

export default EditSpecies;

