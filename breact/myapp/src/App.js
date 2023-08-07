import React, {useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from './abi.json';

function App() {
  const [contract, setContract] = useState();
  const [todoCount, setTodoCount] = useState(0);
  const [inputItem, setInputItem] = useState();
  const [inputListItem, setInputListItem] = useState();
  const [inputListItemRes, setInputListItemRes] = useState();

  const contractExecution = async() => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract("0xDc08cEa2b082723AF351eA060e5c8efcD3F52c06", abi, signer)
    setContract(Contract)
  }

  const getTodoCount = async () => {
    if(contract){
    const res = await contract.count();
    setTodoCount(Number(res))
    }
  }

  useEffect(() => {
    contractExecution();
  }, [])

  const handleChange = (e) => {
     setInputItem(e.target.value)
  }

  const handleSubmit = async () => {
    const res = await contract.getTodo(inputItem);
  }

  const handleGetTodoList = async () => {
    const res = await contract.todoList(inputListItem);
    setInputListItemRes(res);
  }

  const handleTodoList = (e) => {
    setInputListItem(e.target.value)
  }

  return(
    <div>
      <button onClick={getTodoCount}>Get the Count</button>
      <h1>count of todo :- {todoCount}</h1>
      <div>
        Enter the input value
        <input onChange={handleChange}></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <input onChange={handleTodoList}></input>
        <button onClick={handleGetTodoList}>Get todoList</button>
        <h3>{inputListItem}</h3>
      </div>
    </div>
  )
}

export default App