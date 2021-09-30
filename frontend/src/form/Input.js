import {Form} from "react-bootstrap";
function Input({setter, ...props}) {
    return <Form.Control
        {...props}
        onChange={
            function (event) {
                setter(event.target.value)
            }
        }/>
}

export default Input;