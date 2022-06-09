import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getAllTypes } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './Detail';

function validate(input) {
  let errors = {};
  // let bcre = document.querySelector(".Button");
  // bcre.disabled = true;
  // if (errors.name) {
  //   bcre.disabled = true;
  // } else {
  //   bcre.disabled = false;
  // }

if (!input.name || typeof input.name !== "string") {
  errors.name = 'Please enter a name'
}
else if (input.life < 0 || input.life > 100) {
  errors.life = 'Please enter a number between 0 and 100'
}
else if (input.strength < 0 || input.strength > 100) {
  errors.strength = 'Please enter a number between 0 and 100'
}
else if (input.defense < 0 || input.defense > 100) {
  errors.defense = 'Please enter a number between 0 and 100'
}
else if (input.speed < 0 || input.speed > 100) {
  errors.speed = 'Please enter a number between 0 and 100'
}
else if (input.height < 0 || input.height > 100) {
  errors.height = 'Please enter a number between 0 and 100'
}
else if (input.weight < 0 || input.weight > 100) {
  errors.weight = 'Please enter a number between 0 and 100'
}
else if (!input.type) {
  errors.type = 'Please select Type'
}
return errors
}

export default function PokemonCreate() {
  const dispatch = useDispatch()
  const history = useHistory()
  const types = useSelector((state) => state.types)
  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    life: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: []
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleChangeName(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.toLowerCase()
    })
  }

  function handleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value]
    })
  }

  function handleDelete(t) {
    setInput({
      ...input,
      type: input.type.filter(el => el !== t)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input))
    alert("Pokemon crated correctly!!")
    setInput({
      name: "",
      life: "",
      strength: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      type: []
    })
    history.push('/home')
  }

  useEffect(() => {
    dispatch(getAllTypes());
    console.log(Object.keys(errors).length && !Object.values(input).includes("") && !input.type.length)
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div style={{
      border: '#cd5c5c 5px solid',
      backgroundColor: '#ffffff96',
      // margin: '200px',
      marginLeft: '500px',
      marginRight: '500px',
      marginTop: '50px',
      padding: '20px',
      borderRadius: '20px',
      alingItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
    }}>
      <form onSubmit={(e) => handleSubmit(e)} style={{
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right'
      }}>
        <Button name='create' type="submit" disabled={!input.name}>Create Pokemon</Button>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChangeName(e)}
          />
          {errors.name && (
            <p style={{ color: '#cd5c5c' }}>{errors.name}</p>
          )}
        </div>
        <div>
          <label>Life:</label>
          <input
            type="number"
            value={input.life}
            name="life"
            onChange={(e) => handleChange(e)}
          />
          {errors.life && (
            <p style={{ color: '#cd5c5c' }}>{errors.life}</p>
          )}
        </div>
        <div>
          <label>Strength:</label>
          <input
            type="number"
            value={input.strength}
            name="strength"
            onChange={(e) => handleChange(e)}
          />
          {errors.strength && (
            <p style={{ color: '#cd5c5c' }}>{errors.strength}</p>
          )}
        </div>
        <div>
          <label>Defense:</label>
          <input
            type="number"
            value={input.defense}
            name="defense"
            onChange={(e) => handleChange(e)}
          />
          {errors.defense && (
            <p style={{ color: '#cd5c5c' }}>{errors.defense}</p>
          )}
        </div>
        <div>
          <label>Speed:</label>
          <input
            type="number"
            value={input.speed}
            name="speed"
            onChange={(e) => handleChange(e)}
          />
          {errors.speed && (
            <p style={{ color: '#cd5c5c' }}>{errors.speed}</p>
          )}
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={input.height}
            name="height"
            onChange={(e) => handleChange(e)}
          />
          {errors.height && (
            <p style={{ color: '#cd5c5c' }}>{errors.height}</p>
          )}
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="number"
            value={input.weight}
            name="weight"
            onChange={(e) => handleChange(e)}
          />
          {errors.weight && (
            <p style={{ color: '#cd5c5c' }}>{errors.weight}</p>
          )}
        </div>
        <div>
          <label>Image:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <select onChange={(e) => handleSelect(e)}>
            <option value="all">Tipo</option>
            {types?.map((t, i) => {
              return (<option value={t.name} key={i}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>)
            })}
          </select>
          {errors.type && (
            <p style={{ color: '#cd5c5c' }}>{errors.type}</p>
          )}

        </div>
      </form>
      {input.type.map(t =>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignText: 'left',
          alignContent: 'space-between',
          justifyContent: 'right',
        }}>
          <p>{t}</p>
          <Button
            style={{
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'center',
              fontSize: '0.6em',
            }}
            onClick={() => handleDelete(t)}>X</Button>
        </div>
      )}
      <Link to='/home'><Button>Go Back</Button></Link>
    </div>
  )

}