import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";

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

        return fetch('http://localhost:5000/patient/hospitalize', {
            method: 'PUT',
            body: data,
        }).then(async function(response) {
            const responseObject = await response.json();
            if (responseObject.success == true){
                alert("Информация добавлена")
                push('/patient/' + id);

            } else {
                alert("Ошибка")
            }
        })

    }

    return <div>
        <form>
            <Input type="date" dateIn="dateIn" placeholder={"дата госпитализации"} setter={setDateIn}/>
            <Input type="number" min="1"  max="20" room="room" placeholder={"номер палаты"} setter={setRoom}/>
            <button type={"button"} onClick={save}>Зберегти</button>
        </form>
    </div>
}

export default HospitalizePatient;