import {useEffect, useState} from "react";
import ListItem from './ListItem';
import Input from "../form/Input";

function List() {

    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [species, setSpecies] = useState('');
    const [visitDate, setVisitDate] = useState('');

    //https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    //выполнится при загрузке, потому что пустой deps
    useEffect(() => {
        fetch('http://localhost:5000/patient').then(async (response) => {
            setList(await response.json());
        })
    }, [])


    function search() {
        var url = new URL('http://localhost:5000/patient'),
            params = {name, species, age, visitDate}
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
        fetch(url.toString()).then(async (response) => {
            setList(await response.json());
        })
    }

    return (
        <div>
            <div>
                <h3>Пошук за різними ознаками</h3>
                <br/>
                <form>
                    <Input type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                    <Input type="text" name="age" value={age} placeholder={"вік"} setter={setAge}/>
                    <Input type="text" name="species" value={species} placeholder={"вид"} setter={setSpecies}/>
                    <Input type="text" name="visitDate" value={visitDate} placeholder={"дата"} setter={setVisitDate}/>
                    <button type={"button"} onClick={search}>Шукати!</button>


                </form>
            </div>


            {list.map(function (item) {
                return <ListItem item={item} key={item.id}/>;
            })}
        </div>
    );
}

export default List;