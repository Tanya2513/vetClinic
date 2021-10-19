function ListItem({item}) {
    return <tr>
        <td>{item.name}</td>
        <td>{item.species.type}</td>
        <td>{item.diagnosis}</td>
        <td>{item.visitDate}</td>
        <td>{item.animalOwner}</td>
        <td><a className="link-card" href={'/patient/' + item.id}>Перейти до картки пацієнта</a></td>
    </tr>
}

export default ListItem;