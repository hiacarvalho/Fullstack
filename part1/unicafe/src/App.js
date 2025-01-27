import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({statistics}) => {
  console.log(statistics)
  if (statistics.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={statistics.good} />
          <StatisticLine text='neutral' value={statistics.neutral} />
          <StatisticLine text='bad' value={statistics.bad} />
          <StatisticLine text='all' value={statistics.all} />
          <StatisticLine text='average' value={statistics.average} />
          <StatisticLine text='positive' value={statistics.positive + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all ? ((good * 1) + (bad * -1)) / all: 0
  const positive = all ? (good / all) * 100: 0

  const statistics = {
    'good': good,
    'neutral': neutral,
    'bad': bad,
    'all': all,
    'average': average,
    'positive': positive 
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics statistics={statistics} />
    </div>
  );
}

export default App;
