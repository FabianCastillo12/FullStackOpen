import Person from './Person.jsx'

const Persons = ({ persons, onDelete }) => {
    return (
      <ul className='contacts'>
        {persons.map(person =>{
          return <li><Person key={person.id} person={person} onDelete={onDelete}/></li>
        })}
      </ul>
    )
  }

export default Persons