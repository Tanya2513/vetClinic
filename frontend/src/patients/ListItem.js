function ListItem({item}) {
    return <div>
        <span> Ім'я: {item.name}</span>
        <span> Дата народження: {item.birthDate}</span>
        <span> Вид: {item.species.type}</span>
        <span> Діагноз: {item.diagnosis}</span>
        <span> Дата звернення: {item.date}</span>
        <span><a href={'/patient/' + item.id}>Деталі</a></span>
    </div>;
}

export default ListItem;