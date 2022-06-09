import React from 'react';
import styled from 'styled-components'

export const Pagst = styled.ul`
display: inline-block;
padding: 8px;
margin: 20px;
`

export default function Paginado({ pokesPerPage, allPokemons, paginado }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(allPokemons / pokesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav style={{color: '#cd5c5c', paddingTop: '20px'}}>
      <Pagst>
        {
          pageNumbers && pageNumbers.map(number =>( 
            <li style={{display: 'inline'}} key={number} >
              <span style={{color: '#cd5c5c', padding: '20px', cursor: 'pointer' }} onClick={() => paginado(number)}>{number}</span>
            </li>
          ))
        }
      </Pagst>
    </nav>
  )
}
