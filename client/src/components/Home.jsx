/* eslint-disable */
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons, getAllTypes, filterByType, filterCreated, orderByName, orderByStrength, orderByLife } from '../actions'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SerchBar from './SerchBar'
import { Button } from './Detail'


export default function Home() {

  const dispatch = useDispatch()
  const allPokemons = useSelector((state) => state.pokemons)
  const allTypes = useSelector((state) => state.types)
  const errores = useSelector((state) => state.errores)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pokesPerPage, setPokesPerPage] = useState(2)
  const indexOfLastPoke = currentPage * pokesPerPage
  const indexOfFirstPoke = indexOfLastPoke - pokesPerPage
  const currentPokes = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  // const prevpag = (currentPage) => {
  //   if(currentPage > 1){
  //     setCurrentPage(currentPage-1)
  //   }
  // }
  // const postag = (currentPage) => {
  //   if(currentPage+1){
  //     setCurrentPage(currentPage+1)
  //   }
  // }

  useEffect(() => {
    dispatch(getPokemons())
    dispatch(getAllTypes())
  }, [dispatch])

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons())
    dispatch(filterByType("all"))
  }
  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleOrderByStrength(e) {
    e.preventDefault();
    dispatch(orderByStrength(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleOrderByLife(e) {
    e.preventDefault();
    dispatch(orderByLife(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleFilterType(e) {
    dispatch(filterByType(e.target.value))
    setCurrentPage(1)
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div>
      {currentPokes.length > 0 || errores.length > 0 ?
          <div>
            <h1 style={{ color: '#cd5c5c'  }}>Who is that Pokémon??</h1>
            <SerchBar />
            <div>
              <Link to='/pokemons'>
                <Button>Create Pokemon</Button>
              </Link>
              <Button onClick={e => { handleClick(e) }}>
                Reload Pokemons
              </Button>
            </div>
          <div>
            <select onChange={(e) => handleOrderByName(e)}>
              <option value="def">Order by Name</option>
              <option value="nasc">Upward</option>
              <option value="ndes">Falling</option>
            </select>
            <select onChange={(e) => handleOrderByStrength(e)}>
              <option value="def">Order by Strength</option>
              <option value="fasc">Weakest first</option>
              <option value="fdes">Strongest first</option>
            </select>
            <select onChange={(e) => handleOrderByLife(e)}>
              <option value="def">Order by Life</option>
              <option value="lasc">Law first</option>
              <option value="ldes">High first</option>
            </select>
            <select onChange={(e) => handleFilterType(e)}>
              <option value="all">Type</option>
              {allTypes?.map((t, i) => {
                return (<option value={t.name} key={i}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>)
              })}
            </select>
            <select onChange={(e) => handleFilterCreated(e)}>
              <option value="all">Origin</option>
              <option value="bd">Created</option>
              <option value="ex">Existing</option>
            </select>
          </div>
          <div>
            {
              errores[0] === 'NHPDT' ? errores.pop &&
                <div>
                  <h1 style={{ color: '#cd5c5c' }}>There are no pokemon of this type</h1>
                  <img src="https://th.bing.com/th/id/R.f8daa67892f18168cdb38160313420c3?rik=BNNnPdvubfcjpQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f12%2fPokemon-Detective-Pikachu-Movie-PNG-HD.png&ehk=%2bfto5wREUZLihpjN77kNFKz4PnkA75VIw2GXU4W7LgE%3d&risl=&pid=ImgRaw&r=0" alt="" height="300px" width="300px" />
                </div> :
                errores[0] === 'PI' ? errores.pop &&
                  <div>
                    <h1 style={{ color: '#cd5c5c' }}>You haven't created any pokemon</h1>
                    <img src="https://th.bing.com/th/id/R.f8daa67892f18168cdb38160313420c3?rik=BNNnPdvubfcjpQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f12%2fPokemon-Detective-Pikachu-Movie-PNG-HD.png&ehk=%2bfto5wREUZLihpjN77kNFKz4PnkA75VIw2GXU4W7LgE%3d&risl=&pid=ImgRaw&r=0" alt="" height="300px" width="300px" />
                  </div> :
                  <div>
                    <Paginado
                      pokesPerPage={pokesPerPage}
                      allPokemons={allPokemons.length}
                      paginado={paginado}
                    />

                    <div style={{
                      margin: '20px',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignContent: 'space-between',
                      justifyContent: 'center',
                    }}>
                      {
                        currentPokes?.map((p,i) => {
                          return (
                            <Link key={i} style={{
                              textDecoration: 'none'
                            }} to={"/home/" + p.id} >
                              <Card name={p.name} image={p.image} type={p.type ? p.type : p.types?.map(p => p.name)}/>
                            </Link>
                          )
                        })
                      }
                    </div>
                  </div>
            }
          </div>
        </div>
        :
        <div>
          <h3 style={{ color: '#cd5c5c' }}>Loading...</h3>
          <img src="https://static.wikia.nocookie.net/bcd45199-694a-4c47-80e5-c02921faeb2c" alt="" height="80px" width="80px" />
        </div>
      }
    </div>
  )
}

