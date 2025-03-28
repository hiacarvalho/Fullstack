import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notication from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState({type: 'sucess', text: null})

  useEffect(() => {
    //console.log('buscando dados')
    personService.getAll().then((initialPersons) => {
      //console.log('promessa resolvida')
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)
    if (person){
      if (window.confirm(`${newName} is already added to phonebook, replace de old number with a new one ?`)){

        const personObject = {
          name: newName,
          number: newNumber
        }
        
        const id = person.id
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
            setNotificationMessage({type: 'sucess', text: `Updated '${personObject.name}'`})
            setTimeout(() => setNotificationMessage({type: 'error', text: null}), 5000)
          })
        return

      } else {
        return
      }
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNotificationMessage({type: 'sucess', text: `Added '${personObject.name}'`})
        setTimeout(() => setNotificationMessage({type: 'error', text: null}), 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)){
      personService
      .deletePerson(id)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== returnedPerson.id))
      })
      .catch(error => {
        setNotificationMessage({type: 'error', text: `Information of '${person.name}' has already been removed from server`})
        setTimeout(() => setNotificationMessage({type: 'error', text: null}), 5000)
        id = person.id
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notication message={notificationMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App