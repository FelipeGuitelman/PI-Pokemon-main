import React, { useEffect, useState } from 'react'

export default function PokeCard({ name, image, type }) {
  const [imgLoading, setImgLoading]= useState(true)
  const loadingGif = "https://static.wikia.nocookie.net/bcd45199-694a-4c47-80e5-c02921faeb2c"
  const onLoad = ()=>{
    setImgLoading(false)
  }
  useEffect(()=>{
    setImgLoading(true)
  },[image])
  return (
    <div style={{
      border: '#cd5c5c 5px solid',
      backgroundColor: '#ffffff96' ,
      margin: '8px',
      borderRadius: '20px',
      justifyContent: 'center',
      textDecoration: 'none'
    }}>
      <img onLoad={onLoad} src={imgLoading? loadingGif :
       image ? image : defaultimage} alt="img not found" width="200px" height="200px" />
      <h3 style={{color:'black'}}>{name[0].toUpperCase() + name.slice(1)}</h3>
      <h5 style={{color:'black'}}>Type: {type ? type + ' ' : type.map(t => t.name + (' '))} </h5>
    </div>
  )
}

const defaultimage = "https://images6.fanpop.com/image/photos/39700000/20160224-dancave-fanpokemon-1x1-pokemon-39784118-322-268.jpg"