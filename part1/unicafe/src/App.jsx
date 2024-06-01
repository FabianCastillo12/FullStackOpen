import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  const clicks = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  console.log(clicks)

  return (
    <>
      <Title text="give feedback" />
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Title text="statistics" />
      <Statistics clicks={clicks} />
    </>
  )
}

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ clicks }) => {

  const { good, neutral, bad } = clicks

  const all = good + neutral + bad
  console.log(all)

  const average = (good - bad) / all || 0
  console.log(average)

  const positive = 100 * good / all || 0
  console.log(positive)

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return(
    <>
      <table>
        <tbody>
          <StatisticLine text="good:" value={good} />
          <StatisticLine text="neutral:" value={neutral} />
          <StatisticLine text="bad:" value={bad} />
          <StatisticLine text="all:" value={all} />
          <StatisticLine text="average:" value={average} /> 
          <StatisticLine text="positive:" value={positive + " %"} />	
        </tbody>
      </table>
        
    </>
  )
}

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

  


export default App