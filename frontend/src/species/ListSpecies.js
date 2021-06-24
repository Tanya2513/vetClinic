import {useEffect, useState} from "react";
import ListItemSpecies from './ListItemSpecies';

function ListSpecies() {

    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [listSpecies, setListSpecies] = useState([]);

    //https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    //выполнится при загрузке, потому что пустой deps
    useEffect(() => {
        fetch('http://localhost:5000/species').then(async (response) => {
           let answer =await response.json()
            console.log(answer);
               setListSpecies(answer);
        })
    }, [])

    return (
        <div>
            {listSpecies.map(function (item) {
                return <ListItemSpecies item={item} key={item.id}/>;
            })}
        </div>
    );
}

export default ListSpecies;