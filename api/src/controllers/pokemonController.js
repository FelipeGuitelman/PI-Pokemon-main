const axios = require("axios")
const { Pokemon, Type } = require('../db')
const ModelCrud = require('./index')
const { v4: uuidv4 } = require('uuid')

class PokemonModel extends ModelCrud {
  constructor(model) {
    super(model);
  }
  addNew = async (req, res, next) => {
    try {
      const {
        name,
        life,
        strength,
        defense,
        speed,
        height,
        weight,
        image,
        type
      } = req.body
      let pokeCreated = await this.model.create({
        id: uuidv4(),
        name,
        life,
        strength,
        defense,
        speed,
        height,
        weight,
        image
      })      
      let typeBd = await Type.findAll({
        where: { name: type }
      })
      pokeCreated.addType(typeBd)
      res.send(pokeCreated)
    } catch (error) {
      next(error)
    }
  }

  getAllBd = async () => {
    const pokesBd = this.model.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      }
    });    
    return pokesBd
  }
  getAllApi = async () => {
    const pokesApi0 = (await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"));
    const pokesApi = pokesApi0.data.results
    let pokemonesApi = pokesApi.map(e => axios.get(e.url))
    let allUrlInfo = await axios.all(pokemonesApi)
    let pokesMap = allUrlInfo.map(p => p.data)
    let pokesDetail = pokesMap.map(p => {
      return {
        id: p.id,
        image: p.sprites.other.home.front_default,
        type: p.types.map(t => t.type.name),
        name: p.name,
        life: p.stats[0].base_stat,
        strength: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight
      }
    });
    return pokesDetail
  }
  getAll = async (req, res, next) => {
    try {
      const [pokesApi, pokesBd] = await Promise.all([this.getAllApi(), this.getAllBd()]);
      return (res.send([...pokesApi, ...pokesBd]));

    } catch (error) {
      console.log(error)
    }
  }

  getPokeById = (req, res, next) => {
    const id = req.params.id
    if (id.length < 4) {
      const pokeApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      pokeApi.then((p) => res.send([{
        id: p.data.id,
        image: p.data.sprites.other.home.front_default,
        type: p.data.types.map(t => t.type.name),
        name: p.data.name,
        life: p.data.stats[0].base_stat,
        strength: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        height: p.data.height,
        weight: p.data.weight
      }]))
        .catch((error) => next(error))
    }
    else {
      return this.model.findByPk(id,{
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        }
      })
        .then(result => res.send([result]))
        .catch((error) => next(error))
    }
  }

  getPokeByName = async (req, res, next) => {
    const { name } = req.query
    name.toLowerCase()
    try {
      let pokeBd = [await this.model.findOne({
        where: { name },
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          },
        }
      })]
      if (pokeBd[0]) {
        (res.send(pokeBd))
      }
      else {
        const pokeApi = axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        return pokeApi
          .then((p) => res.send([{
            id: p.data.id,
            image: p.data.sprites.other.home.front_default,
            type: p.data.types.map(t => t.type.name),
            name: p.data.name,
            life: p.data.stats[0].base_stat,
            strength: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight
          }]))
          .catch((error) => next(error))
      }
    } catch (error) {
      next(error)
    }
  }

  addTypeToPokemon = (req, res, next) => {
    const { pokemonId, typeId } = req.params;
    this.model
      .findByPk(pokemonId)
      .then((pokemon) => {
        return pokemon.addType(typeId)
      })
      .then(() => res.send(200))
      .catch((error) => next(error))
  }
}

const pokemonController = new PokemonModel(Pokemon)

module.exports = pokemonController
