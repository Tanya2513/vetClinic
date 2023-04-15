import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";
import {Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import API_URL from "../constant";

function DischargePatient(){
    let { id } = useParams();
    const {push} = useHistory();

    const [dateOut, setDateOut] = useState('');

    function save() {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('dateOut', dateOut);



        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetcher(API_URL + '/patient/discharge', {
            method: 'PUT',
            body: data,
        }).then(async function(responseObject) {
            if (responseObject.success == true){
                alert("Інформацію внесено")
                push('/patient/' + id);

            } else {
                alert("Помилка")
            }
        })

    }

    return <div>
        <h1>Виписка пацієнта зі стаціонару</h1>
        <Form>
            <Col>
                <Input className="form-card" type="date" dateIn="dateOut" placeholder={"дата выписки"} setter={setDateOut}/>
            </Col>
            <Button className="button-card" variant="secondary" type={"button"} onClick={save}>Зберегти</Button>
        </Form>
    </div>
}

export default DischargePatient;