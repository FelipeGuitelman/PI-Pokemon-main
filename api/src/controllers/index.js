const {v4: uuidv4 }  = require('uuid')

class ModelCrud {
  constructor(model){
    this.model = model
  }
  getAll = (req,res,next)=>{
    return this.model.findAll()
    .then(results=>res.send(results))
    .catch((error)=> next(error))
  }
  
  getById = (req,res,next)=>{
    const id = req.params.id
    return this.model.findByPk(id)
    .then(result=>res.send(result))
    .catch((error)=> next(error))
  }
  
  getByName = (req,res,next)=>{
    const { name } = req.query
    return this.model.findOne({where:{name}, include:this.model.name})
    .then(result=>res.send(result))
    .catch((error)=> next(error))
  }
  
  addNew = (req,res)=>{
    const body = req.body
    return this.model.create({
      ...body,
      id: uuidv4()
    })
    .then(createdElement=>res.send(createdElement))
    .catch((error)=> next(error))
  }
}

module.exports = ModelCrud;