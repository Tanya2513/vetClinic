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
            setListSpecies(answer);
        })
    }, [])

    function speciesToListItem(item) {
        console.log(item);
        return <ListItemSpecies item={item} key={item.id}/>;
    };

    console.log("listSpecies", listSpecies);
    return (
        <div>
            {listSpecies.map(speciesToListItem)}
        </div>
    );
}

export default ListSpecies;
