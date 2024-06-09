const Person = ({ person, onDelete }) => {
    return (
      <div className="person">
        <span>{person.name}</span>
        <span>{person.number}</span>
        <button onClick={() => {onDelete(person.id)}}>delete</button>
        <br />
      </div>
    )
  }

export default Person