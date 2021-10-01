import {useEffect, useState} from "react";
import ListItemSpecies from './ListItemSpecies';
import fetcher from "../fetcher";
import ListItem from "../patients/ListItem";
import {Table} from "react-bootstrap";

function ListSpecies() {

    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [listSpecies, setListSpecies] = useState([]);


    //https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    //выполнится при загрузке, потому что пустой deps
    useEffect(() => {
        fetcher('http://localhost:5000/species').then(async (response) => {
            setListSpecies(response);
        })
    }, [])

    function speciesToListItem(item) {
        console.log(item);
        return <ListItemSpecies item={item} key={item.id}/>;
    };

    console.log("listSpecies", listSpecies);
    return (<>
            <h1>Довідник видів тварин</h1>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Вид</th>
                <th>Опис</th>
                <th>Особливості</th>
                <th>Посилання</th>
            </tr>
            </thead>
            <tbody>
            {listSpecies.map(speciesToListItem)}
            </tbody>
        </Table>
    </>
    );
}

export default ListSpecies;
