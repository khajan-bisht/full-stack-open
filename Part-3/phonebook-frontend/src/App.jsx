import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch(() => {
        notify(`Could not load contacts from serer`, 'error')
      })
  }, [])

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const addPerson = (event) => {
    event.preventDefault()
    const personAlreadyExists = persons.find(
      (person) => person.name === newName
    )
    if (personAlreadyExists) {
      const result = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with a new one?`
      )
      if (!result) return

      const updateNumber = { ...personAlreadyExists, number: newNumber }

      personsService
        .update(personAlreadyExists.id, updateNumber)
        .then((returnPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== returnPerson.id ? person : returnPerson
            )
          )
          notify(`Updated number for ${newName}`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          notify(error.response.data.error, 'error')
         /* setPersons(
            persons.filter((person) => person.id !== personAlreadyExists.id)
          )*/
        })
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personsService
      .create(personObject)
      .then((returnPerson) => {
        setPersons(persons.concat(returnPerson))
        notify(`Added ${newName}`, 'success')
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        notify(error.response.data.error, 'error')
      })
  }

  const deletePerson = (id, name) => {
    //const name = persons.find((person) => person.id === id).name
    if (!window.confirm(`Delete ${name}?`)) return

    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        notify(`Deleted ${name} from server`, 'success')
      })
      .catch(() => {
        notify(`Information of ${name} has already been removed from server`, 'error')
        setPersons(persons.filter((person) => person.id !== id))
      })
  }

  const handlePersonAdd = (event) => {
    console.log('name added', event.target.value)
    setNewName(event.target.value)
  }

  const handlePersonNumberAdd = (event) => {
    console.log('number added', event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log('filter changed', event.target.value)
    setFilter(event.target.value)
  }

  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
        handlePersonAdd={handlePersonAdd} handlePersonNumberAdd={handlePersonNumberAdd} />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
