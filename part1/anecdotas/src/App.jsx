import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdotePoints = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotePoints)
  const [mostVoted, setMostVoted] = useState(0)

  const addPoints= () =>{
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)

    const mostVotedAnecdote = () =>{
      let max = 0
      let index = 0
      for(let i = 0; i < copy.length; i++){
        if(copy[i] > max){
          max = copy[i]
          index = i
        }
      }
      return index
    }
    setMostVoted(mostVotedAnecdote)
  }
  console.log(points)

  const changeAnecdote = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  
  return (
    <>
      <Title text="Anecdote of the day" />
      {anecdotes[selected]} <br /><br />
      <Button handleClick={addPoints} text="vote" />
      <Button handleClick={changeAnecdote} text="next anecdote" /><br />
      <Title text="Most Popular Anecdote" />
      {anecdotes[mostVoted]}
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Title = ({text}) => <h1>{text}</h1>

export default App