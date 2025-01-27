import { useState } from "react";

const Historico = ({todosOsCliques}) => {
  if(todosOsCliques.length === 0){
    return(
      <div>
        Clique nos botões para ver o histórico
      </div>
    )
  }
  return(
    <div>
    {todosOsCliques.join(' ')}
    </div>
  )
}

const Botao = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [esquerda, setEsquerda] = useState(0)
  const [direita, setDireita] = useState(0)
  const [todosOsCliques, setTodos] = useState([])
  const [total, setTotal] = useState(0)

  const ola = (quem) => () => console.log('Olá', quem);
  
  const handleEsquerda = () => {
    setTodos(todosOsCliques.concat('E'))
    console.log('clique esquerdo anterior', esquerda)
    const atualizarEsquerda = esquerda + 1
    setEsquerda(atualizarEsquerda)
    console.log('clique esquerdo posterior', atualizarEsquerda)
    setTotal(direita + atualizarEsquerda)
  }
  const handleDireita = () => {
    setDireita(direita + 1)
    setTotal(direita + esquerda)
  }

  return(
    <div>
      {esquerda}
      <Botao onClick={handleEsquerda} text='Esquerda'/>
      <Botao onClick={handleDireita} text='Direita'/>
      <Botao onClick={ola('Cu')} text='Olá'/>
      <Historico todosOsCliques={todosOsCliques}/>
    </div>
  )
}

export default App;
