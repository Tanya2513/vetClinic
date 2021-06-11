function ListItem({item}) {
    return <div>
        <span> Ім'я: {item.name}</span>
        <span> Вік: {item.age}</span>
        <span> Вид: {item.species}</span>
        <span> Діагноз: {item.diagnosis}</span>
        <span> Дата звернення: {item.date}</span>
        <span><a href={'/patient/' + item.id}>Деталі</a></span>
    </div>;
}

export default ListItem;