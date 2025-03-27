import { useState, useEffect } from "react";
import axios from 'axios'
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [value, setValue] = useState('')

  useEffect(() =>{
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (value && countries) {
      setCountriesToShow(countries.filter(countrie => countrie.name.common.toLowerCase().includes(value.toLowerCase())))
      return
    }
    setCountriesToShow([])
  },[value, countries])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleShow = (cca3) => {
    const selectedCountrie = countries.filter(countrie => countrie.cca3 === cca3)
    setCountriesToShow(selectedCountrie)
}

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <Countries countries={countriesToShow} handleShow={handleShow}/>
    </div>
  );
}

export default App;
