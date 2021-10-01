import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function HospitalizePatient(){
    let { id } = useParams();
    const {push} = useHistory();

    const [dateIn, setDateIn] = useState('');
    const [room, setRoom] = useState('');
    function save() {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('dateIn', dateIn);
        formData.append('room', room);


        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher('http://localhost:5000/patient/hospitalize', {
            method: 'PUT',
            body: data,
        }).then(async function(responseObject) {
            if (responseObject.success == true){
                alert("Информация добавлена")
                push('/patient/' + id);

            } else {
                alert("Ошибка")
            }
        })

    }

    return <div>
        <h1>Госпіталізація пацієнта</h1>
        <Form>
            <Col>
                <Input className="form-card" type="date" dateIn="dateIn" placeholder={"дата госпитализации"} setter={setDateIn}/>
            </Col>
            <Col>
                <Input className="form-card" type="number" min="1"  max="20" room="room" placeholder={"номер палаты"} setter={setRoom}/>
            </Col>
            <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
        </Form>
    </div>
}

export default HospitalizePatient;