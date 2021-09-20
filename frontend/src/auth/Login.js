import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";

function Login() {
    const {push} = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function authorize() {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);


        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: data,
        }).then(async function (response) {
            const responseObject = await response.json();
            if (responseObject.statusCode === 401) {
                alert(responseObject.message)
            } else {
                localStorage.setItem('jwt', responseObject.access_token);
                // document.cookie = `referral_key=hello;max-age=604800;domain=example.com`
                push('/list');
            }
        })

    }

    return <div>
        <form>
            <Input type="text" placeholder={"username"} setter={setUsername}/>
            <Input type="password" placeholder={"password"} setter={setPassword}/>
            <button type={"button"} onClick={authorize}>Зберегти</button>
        </form>
    </div>
}

export default Login;