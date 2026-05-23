const Persons = ({ filteredPersons, deletePerson }) => {
    return (
        <>
            {filteredPersons.map(person => 
            <div key={person.name}>{person.name} {person.number} 
            <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
            </div>
            )}
        </>
    )
}

export default Persons