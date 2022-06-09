const initialSatate = {
  pokemons: [],
  types: [],
  allPokes: [],
  errores: [],
  detail: []
}

function rootReducer(state = initialSatate, action) {
  switch (action.type) {
    case 'GET_POKEMONS':
      return {
        ...state,
        pokemons: action.payload,
        allPokes: action.payload
      }

    case 'GET_NAME_POKEMON':
      if (action.payload.includes('PI')) {
        return {
          ...state,
          errores: action.payload,
        }
      } else {
        return {
          ...state,
          pokemons: action.payload,
        }
      }


    case 'POST_POKEMON':
      return {
        ...state,
      }

    case 'GET_TYPES':
      return {
        ...state,
        types: action.payload
      }

    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload
      }

    case 'CLEAR_DETAIL':
      return {
        ...state,
        detail: []
      }

    case 'FILTER_BY_TYPE':
      const allPokes = state.allPokes
      const typeFiltered = action.payload === "all" ? allPokes : allPokes.filter(t => t.type ? t.type.includes(action.payload) : t.types.map(t => t.name).includes(action.payload))
      return {
        ...state,
        pokemons: typeFiltered,
        errores: typeFiltered.length === 0 ? ['NHPDT'] : []
      }
    case 'FILTER_CREATED':
      const createdFilter = action.payload === "bd" ? state.allPokes.filter(t => typeof t.id !== "number") : state.allPokes.filter(t => typeof t.id === "number")
      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokes : createdFilter,
        errores: createdFilter.length === 0 ? ['PI'] : []
      }

    case 'ORDER_BY_NAME':
      let sortedArr = action.payload === "nasc" ?
        state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (b.name > a.name) {
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function (a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (b.name > a.name) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        pokemons: action.payload === "def" ? state.allPokes : sortedArr,
        errores: []
      }

    case 'ORDER_BY_STRENGTH':
      let sortedArr2 = action.payload === "fasc" ?
        state.pokemons.sort(function (a, b) {
          if (a.strength > b.strength) {
            return 1;
          }
          if (b.strength > a.strength) {
            return -1;
          }
          return 0;
        }) :
        state.pokemons.sort(function (a, b) {
          if (a.strength > b.strength) {
            return -1;
          }
          if (b.strength > a.strength) {
            return 1;
          }
          return 0;
        })

      return {
        ...state,
        pokemons: action.payload === "def" ? state.allPokes : sortedArr2,
        errores: []
      }

    default: return state
  }
}

export default rootReducer