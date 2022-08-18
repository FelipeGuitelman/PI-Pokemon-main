import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Detail'

export default function LandingPage(){
  return(
    <div>
      <h1 style={{color:'#cd5c5c'}}>Welcome to my PokeApi!</h1>
      <Link to = '/home'>
        <Button>Start</Button>
      </Link>
    </div>
  )
}