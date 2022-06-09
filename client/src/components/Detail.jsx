import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDetail, clearDetail } from '../actions/index'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'

export const Button = styled.button`
background: white;
cursor: pointer;
font-size: 1em;
margin: 0.5em;
padding: 1px 1px;
border: 2px solid #cd5c5c;
border-radius: 5px;
transition: all .3s ease;

&:hover {
  background: #cd5c5c
}
`

export default function Detail(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
    return (() => {
      dispatch(clearDetail())
    })
    // eslint-disable-next-line
  }, [dispatch])

  const myPokemon = useSelector((state) => state.detail)

  return (
    <div>
      {
        myPokemon.length > 0 ?
          <div style={{
            margin: '200px',
            marginTop: '50px',
            padding: '10px',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'space-between',
            justifyContent: 'center',
            border: '#cd5c5c 5px solid',
            backgroundColor: '#ffffff96',
            borderRadius: '20px',
            textDecoration: 'none'
          }}>
            <Link to='/home'>
              <Button>Go Back</Button>
            </Link>
            <div>
              <h1>{myPokemon[0].name[0].toUpperCase() + myPokemon[0].name.slice(1)}</h1>
              <img src={myPokemon[0].image} alt="" width="400px" height="400px" />
            </div>
            <div style={{fontSize: '1.3em',}}>
              <h3>Type: {myPokemon[0].type ? myPokemon[0].type + ' ' : myPokemon[0].types.map(t => t.name + (' '))} </h3>
              <h5 style={{marginTop: '100px',}}>Life: {myPokemon[0].life}</h5>
              <h5>Strength: {myPokemon[0].strength}</h5>
              <h5>Defense: {myPokemon[0].defense}</h5>
              <h5>Speed: {myPokemon[0].speed}</h5>
              <h5>Height: {myPokemon[0].height}</h5>
              <h5>Weight: {myPokemon[0].weight}</h5>
              <h6>Id: {myPokemon[0].id}</h6>
            </div>
          </div> :
          <div>
            <h3 style={{ color: '#cd5c5c' }}>Loading...</h3>
            <img src="https://static.wikia.nocookie.net/bcd45199-694a-4c47-80e5-c02921faeb2c" alt="" height="80px" width="80px" />
          </div>
      }

    </div>
  )
}