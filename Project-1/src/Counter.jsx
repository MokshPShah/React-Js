import React, { useEffect, useState } from 'react'

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
        setTime(new Date().toLocaleTimeString());
    }, 1000);

    return() => clearInterval(interval);
  }, [])

  return (
    <>
      <h3>Current Time: {time}</h3>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </>
  )
}

export default Counter
