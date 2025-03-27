const Countrie = ({ countrie }) => {
    const languages = Object.values(countrie.languages)
    return (
        <div>
            <h1>{countrie.name.common}</h1>
            <p>Capital {countrie.capital}</p>
            <p>Area {countrie.area}</p>
            <h2>Languages</h2>
            <ul>{languages.map(language => <li key={language}>{language}</li>)}</ul>
            <img src={countrie.flags.svg} alt={countrie.flags.alt} width='200'/>
        </div>
    )
}

export default Countrie