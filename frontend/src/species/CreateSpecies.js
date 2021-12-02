import {useState} from "react";
import Input from "../form/Input";
import {useHistory} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function CreateSpecies() {
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');
    const {push} = useHistory();

    function save() {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('features', features);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/species/', {
            method: 'POST',
            body: data,
        }).then(async function(responseObject) {
            if (responseObject.success == true){
                alert("Добавлено карту")
                push('/list_species/');

            } else {
                alert("Помилка")
            }
        })

    }


    return (
        <div>
            <h1> Додати новий вид тварин у довідник</h1>
            <Form>
                <Col>
                    <Input className="form-card" type="text" name="type" placeholder={"вид"} setter={setType}/>
                </Col>
                <Col>
                    <Input className="form-card" type="text" name="description" placeholder={"опис"} setter={setDescription}/>
                </Col>
                <Col>
                    <Input className="form-card" type="text" name="features" placeholder={"особливості"} setter={setFeatures}/>
                </Col>
                <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
            </Form>
        </div>
    );
}

export default CreateSpecies;
