import React from "react";
import { useState } from "react";
import { useDispatch  } from "react-redux";
// import { useHistory } from "react-router-dom";
import { getNamePokemon } from "../actions";
import { Button } from "./Detail";

export default function SerchBar (){
  const dispatch = useDispatch()
  const [name, setName] = useState("")

  function handleInputchange(e){
    e.preventDefault()
    setName(e.target.value.toLowerCase())
  }

  function handleSubmit(e){
    e.preventDefault()
    dispatch(getNamePokemon(name))
    setName("")
  }

  return(
    <div >
      <input style={{border: '2px solid #cd5c5c'}}
      type="text"
      placeholder="Find Pokemon..."
      onChange={(e) => handleInputchange(e)}
      value= {name}
      />
      <Button type = "submit" onClick = {(e)=> handleSubmit(e)}>Buscar</Button>
    </div>
  )
}