import axios from 'axios'

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("/pokemons", {});
    return dispatch({
      type: 'GET_POKEMONS',
      payload: json.data
    })
  }
}

export function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons/name?name="+ name);
      return dispatch({
        type: 'GET_NAME_POKEMON',
        payload: json.data
      })
    } catch (error) {
        return dispatch({
          type: 'GET_NAME_POKEMON',
          payload: ['PI']
        })
    }

    
  }
}

export function getAllTypes() {
  return async function (dispatch) {
    var json = await axios.get("/types/", {});
    return dispatch({
      type: 'GET_TYPES',
      payload: json.data
    })
  }
}

export function postPokemon(payload){
  return async function (dispatch){
    const response = await axios.post("/pokemons/", payload);
    return response
  }
}

export function filterByType(payload) {
  return {
    type: 'FILTER_BY_TYPE',
    payload
  }
}

export function filterCreated(payload) {
  return {
    type: 'FILTER_CREATED',
    payload
  }
}
export function orderByName(payload) {
  return {
    type: 'ORDER_BY_NAME',
    payload
  }
}

export function orderByStrength(payload) {
  return {
    type: 'ORDER_BY_STRENGTH',
    payload
  }
}

export function orderByLife(payload) {
  console.log(payload)
  return {
    type: 'ORDER_BY_LIFE',
    payload
  }
}

export function getDetail (id){
  return async function (dispatch) {
    try {
      var json = await axios.get("/pokemons/"+ id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export function clearDetail(payload) {
  return {
    type: 'CLEAR_DETAIL',
    payload
  }
}