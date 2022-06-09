import React from 'react'

export default function PokeCard({ name, image, type }) {
  return (
    <div style={{
      border: '#cd5c5c 5px solid',
      backgroundColor: '#ffffff96' ,
      margin: '8px',
      borderRadius: '20px',
      justifyContent: 'center',
      textDecoration: 'none'
    }}>
      <img src={image ? image : defaultimage} alt="img not found" width="200px" height="200px" />
      <h3 style={{color:'black'}}>{name[0].toUpperCase() + name.slice(1)}</h3>
      <h5 style={{color:'black'}}>Type: {type ? type + ' ' : type.map(t => t.name + (' '))} </h5>
    </div>
  )
}

const defaultimage = "https://images6.fanpop.com/image/photos/39700000/20160224-dancave-fanpokemon-1x1-pokemon-39784118-322-268.jpg"