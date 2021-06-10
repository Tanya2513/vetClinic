function ListItem({item}) {
    return <div>
        <span> name: {item.name}</span>
        <span> age {item.age}</span>
        <span><a href={'/patient/' + item.id}>Деталі</a></span>
    </div>;
}

export default ListItem;