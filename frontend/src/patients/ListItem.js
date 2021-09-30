function ListItem({item}) {
    return <tr>
        <td>{item.name}</td>
        <td>{item.birthDate}</td>
        <td>{item.species.type}</td>
        <td>{item.diagnosis}</td>
        <td>{item.date}</td>
        <td><a href={'/patient/' + item.id}>Деталі</a></td>
    </tr>
}

export default ListItem;