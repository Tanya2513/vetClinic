import {useEffect, useState} from "react";
import Input from "../form/Input";
import {useHistory, useParams} from "react-router-dom";

//компонент
function EditSpecies() {
    const state = useState('');

    //вызывается useState с initialValue, возвращает масив из 2х елементов
    //мы деструктуризируем их и даем названия name, setName
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState('');


    const {push} = useHistory();
    let { id } = useParams();

    useEffect(() => {
        fetch('http://localhost:5000/species/' + id).then(async (response) => {
             const responseObject = await response.json();
             setType(responseObject.type);
             setDescription(responseObject.description);
             setFeatures(responseObject.features);
        })
    }, [id]);

    function save() {
        const formData = new FormData();
        formData.append('type', type);
        formData.append('description', description);
        formData.append('features', features);

        const data = new URLSearchParams();
        for (const pair of formData) {
            data.append(pair[0], pair[1]);
        }

        return fetch('http://localhost:5000/species/' + id, {
            method: 'PUT',
            body: data,
        }).then(async function (response) {
            const responseObject = await response.json();
            if (responseObject.success == true) {
                alert("Изменения внесены")
                push('/species/' + id);

            } else {
                alert("Ошибка")
            }
        })

    }


    return (
        <div>
            <form>
                <Input type="text" name="type" value={type} placeholder={"вид"} setter={setType}/>
                <Input type="text" name="description" value={description} placeholder={"опис"} setter={setDescription}/>
                <Input type="text" name="features" value={features} placeholder={"особливості"} setter={setFeatures}/>
                <button type={"button"} onClick={save}>Зберегти</button>
            </form>
        </div>
    );
}

export default EditSpecies;

