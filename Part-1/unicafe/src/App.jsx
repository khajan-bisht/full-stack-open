import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, suffix = '' }) => (
  <tr>
    <td>{text}</td>
    <td>{value} {suffix}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  
  // feedback values are: good 1, neutral 0, bad -1 so the average is the sum of good and bad divided by the total number of feedbacks
  const average = all > 0 ? ((good - bad) / all).toFixed(1) : 0
  const positive = all > 0 ? ((good / all) * 100).toFixed(1) : 0

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          {all === 0 ? (
            <tr>
              <td>No feedback given</td>
            </tr>
          ) : (
            <>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={all} />
              <StatisticLine text="average" value={average} />
              <StatisticLine text="positive" value={positive} suffix="%" />
            </>
          )}
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log('good before', good)
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log('neutral before', neutral)
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log('bad before', bad)
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App