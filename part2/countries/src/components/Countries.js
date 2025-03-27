import Countrie from './Countrie'

const Countries = ({ countries, handleShow }) => {
    if (countries.length === 1) {
        return <Countrie countrie={countries[0]}/>
    }

    else if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }

    return (
        <ul>
            {countries.map(countrie => <li key={countrie.cca3}>{countrie.name.common} <button onClick={() => handleShow(countrie.cca3)}>Show</button></li>)}
        </ul>
    )
}
export default Countries