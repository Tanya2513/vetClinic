import Input from "../form/Input";
import {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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

    return <Row  className="justify-content-md-center">
        <Col xs={4}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username:</Form.Label>
                    <Input type="text" placeholder={"username"} setter={setUsername}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password:</Form.Label>
                    <Input type="password" placeholder={"password"} setter={setPassword}/>
                </Form.Group>

                <Button variant="primary" type={"button"} onClick={authorize}>Увійти</Button>
            </Form>
        </Col>
    </Row>
}

export default Login;