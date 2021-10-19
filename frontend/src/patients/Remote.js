import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Remote(){
    let { id } = useParams();
    const {push} = useHistory();

    const [remoteVisitDate, setRemoteVisitDate] = useState('');
    const [remoteVisitAddress, setRemoteVisitAddress] = useState('');

    function save() {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('remoteVisitDate', remoteVisitDate);
        formData.append('remoteVisitAddress', remoteVisitAddress);



        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/patient/remote', {
            method: 'PUT',
            body: data,
        }).then(async function(responseObject) {
            if (responseObject.success == true){
                alert("Інформацію додано")
                push('/patient/' + id);

            } else {
                alert("Помилка")
            }
        })

    }

    return <div>
        <h1>Виклик лікаря за адресою</h1>
        <Form>
            <Col>
                <Input className="form-card" type="datetime-local"  setter={setRemoteVisitDate}/>
            </Col>
            <Col>
                <Input className="form-card" type="text"  placeholder="адреса" setter={setRemoteVisitAddress}/>
            </Col>
            <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
        </Form>
    </div>
}

export default Remote;