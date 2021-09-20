import {useEffect, useState} from "react";
import ListItem from './ListItem';
import Input from "../form/Input";
import fetcher from "../fetcher";

function List({dateNow}) {
    
    //https://ru.reactjs.org/docs/hooks-reference.html#usestate
    //состояния
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [speciesId, setSpeciesId] = useState('');
    const [visitDate, setVisitDate] = useState('');

    console.log('dateNow', dateNow);
    //https://ru.reactjs.org/docs/hooks-reference.html#useeffect
    useEffect(() => {
        fetcher('http://localhost:5000/patient').then(async (response) => {
            setList(await response);
        })
    }, [dateNow])


    function search() {
        let url = new URL('http://localhost:5000/patient');
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
        fetcher('http://localhost:5000/species').then(async (answer) => {
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
                <h3>Пошук за різними ознаками</h3>
                <br/>
                <form>
                    <Input type="text" name="name" value={name} placeholder={"ім'я"} setter={setName}/>
                    <p>
                        <select onChange={optionChange} name="speciesId" size="1" >
                            {optionList}
                        </select>
                    </p>
                    <Input type="text" name="birthDate" value={birthDate} placeholder={"дата народження"} setter={setBirthDate}/>
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
