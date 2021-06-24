function ListItemSpecies({item}) {
    return <div>
        <span> Вид: {item.type}</span>
        <span> Опис: {item.description}</span>
        <span> Особливості: {item.features}</span>
        <span><a href={'/species/' + item.id}>Деталі</a></span>
    </div>;
}

export default ListItemSpecies;