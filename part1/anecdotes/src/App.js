import { useState } from 'react'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const getMostVoted = (list) => {
  const mostVoteted = Math.max(...list)
  return list.indexOf(mostVoteted)
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Anecdote = ({header, anecdote, votes}) => {
  return(
    <div>
      <h1>{header}</h1>
      <p>{anecdote}</p>
      <p>has {votes}</p>
    </div>
  )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  
  const setNextAnecdote = (selected) => {
    let nextAnecdote = getRandomInt(anecdotes.length)
    if (nextAnecdote === selected){
      nextAnecdote = getRandomInt(anecdotes.length)
    }
    setSelected(nextAnecdote)
  }

  const updateVotes = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVoted = getMostVoted(votes)

  console.log('Selected: ', selected)
  console.log('Votes: ', votes)
  console.log('MostVotedIndex: ', mostVoted)

  return (
    <div>
      <Anecdote header='Anecdote of the day' anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={() => updateVotes(selected)} text='vote' />
      <Button onClick={() => setNextAnecdote(selected)} text='next anecdote'/>
      <Anecdote header='Anecdote with most votes' anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  );
}

export default App;
