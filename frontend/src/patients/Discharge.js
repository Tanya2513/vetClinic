import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import fetcher from "../fetcher";

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

        return fetcher('http://localhost:5000/patient/discharge', {
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
        <form>
            <Input type="date" dateIn="dateOut" placeholder={"дата выписки"} setter={setDateOut}/>
            <button type={"button"} onClick={save}>Зберегти</button>
        </form>
    </div>
}

export default DischargePatient;