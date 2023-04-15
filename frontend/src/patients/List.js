import {useEffect, useState} from "react";
import ListItem from './ListItem';
import Input from "../form/Input";
import fetcher from "../fetcher";
import {Col, Form, Row, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import API_URL from "../constant";

function List({dateNow}) {

    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState('');
    const [visitDate, setVisitDate] = useState('');

    console.log('dateNow', dateNow);
    useEffect(() => {
        fetcher(API_URL + '/patient').then(async (response) => {
            const ttt  = await response;
            console.log('ttt', ttt);
            setList(ttt);
        })
    }, [dateNow])


    function search() {
        let url = new URL(API_URL + '/patient');
        let filterId = speciesId;
        if(filterId === "все"){
            filterId = null
        };
        const params = {
                name,
                speciesId: filterId,
                birthDate,
                visitDate
        }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        const urlString = url.toString();
        console.log('urlString', urlString);
        fetcher(urlString).then((response) => {
            setList(response);
        })
    }

const[speciesList, setSpeciesList]=useState([]);

    useEffect(() => {
        fetcher(API_URL + '/species').then(async (answer) => {
            answer.unshift({type: "все", description: "", id: null, features: ""});
            setSpeciesList(answer);
        })
    }, [])


    function optionChange(event){
        setSpeciesId(event.target.value);
    }

    function itemToOption(item){
        console.log(item);
        return <option value={item.id} key={item.id}>{item.type}</option>;
    }
    let optionList = speciesList.map(itemToOption);

    return (
        <div>
            <div>
                <h1 className="search">Список пацієнтів клініки</h1>

                <Form className="search-form">
                    <Row>
                        <Col>
                            <Input type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                        </Col>
                        <Col>
                            <Form.Select aria-label="Default select example" onChange={optionChange} name="speciesId" size="1">
                                {optionList}
                            </Form.Select>
                        </Col>
                        <Col>
                            <Button variant="secondary" type={"button"} onClick={search}>Шукати!</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Ім'я</th>
                    <th>Вид</th>
                    <th>Діагноз</th>
                    <th>Дата звернення</th>
                    <th>ПІБ власника</th>
                    <th>Деталі</th>
                </tr>
                </thead>
                <tbody>
                {list.map(function (item) {
                    return <ListItem item={item} key={item.id}/>;
                })}
                </tbody>
            </Table>
        </div>
    );
}

export default List;
