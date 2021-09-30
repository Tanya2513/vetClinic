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
    return (
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
    );
}

export default ListSpecies;
//
// <table>
//     <tr>
//         <td>stas</td>
//     </tr>
//     <tr>
//         <td>tanya</td>
//     </tr>
// </table>
//
//
// --------
// |stas  |
// --------
// | tanya|
// --------
//
// const inputArr = [
//     {name: 'stas'},
//     {name: 'tanya'},
// ];
// function renderRaw(a){
//     return <div>a*2</div>;
// }
//
// <Table>
//     {inputArr.map(renderRaw)};
// </Table>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// [
//     {type: 'носушка', description: 'хорошая', id: 3, features: 'серий'}
//  {type: 'носушка', description: 'хорошая', id: 4, features: 'серий'}
//  {type: 'кот', description: 'большой', id: 5, features: 'черний'}
//
// ]
//
//
// <tr>
//     <td>носушка</td>
//     <td>хорошая</td>
//     <td>3</td>
//     <td>серий</td>
// </tr>
// <tr>
//     <td>носушка</td>
//     <td>хорошая</td>
//     <td>4</td>
//     <td>серий</td>
// </tr>
// <tr>
//     <td>кот</td>
//     <td>большой</td>
//     <td>5</td>
//     <td>черний</td>
// </tr>