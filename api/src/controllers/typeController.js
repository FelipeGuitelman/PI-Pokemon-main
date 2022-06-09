const {v4: uuidv4 }  = require('uuid')
const axios = require("axios")
const { Type } = require('../db')
const ModelCrud = require ('./index')


class TypeModel extends ModelCrud {
  constructor(model) {
    super(model);
  }
  getAllToBd = async(req, res, next) => {
    try {
      let types = (await axios.get("https://pokeapi.co/api/v2/type")).data.results.map(p=>({
        // id: uuidv4(),
        name: p.name
      }))
      await Type.bulkCreate(types)
      console.log("Tipos cargados en BD correctamente")
    } catch (error) {
        console.log(error)
    }
  }
}

const typeController = new TypeModel(Type)

module.exports = typeController