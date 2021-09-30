function ListItemSpecies({item}) {
    return <tr>
        <td>{item.type}</td>
        <td>{item.description}</td>
        <td>{item.features}</td>
        <td><a href={'/species/' + item.id}>Деталі</a></td>
    </tr>;
}

export default ListItemSpecies;