import {useEffect, useState} from "react";
import ListItem from './ListItem';

function List() {

    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [list, setList] = useState([]);

    //https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    //выполнится при загрузке, потому что пустой deps
    useEffect(() => {
        fetch('http://localhost:5000/patient').then(async (response) => {
            setList(await response.json());
        })
    }, [])

    return (
        <div>
            {list.map(function (item) {
                return <ListItem item={item} key={item.id}/>;
            })}
        </div>
    );
}

export default List;