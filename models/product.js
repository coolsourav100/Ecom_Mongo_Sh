const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class Product{
  constructor(title,price,description,imgUrl,id,userId){
    this.title = title
    this.price = price
    this.description = description
    this.imgUrl = imgUrl
    this._id = new mongodb.ObjectId(id)
    this.userId = userId
  }
  save(){
let db= getDb()
let dpOp
if(this._id==null){
  dpOp =db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)},{$set:this})
}else{
  
dpOp = db.collection('products').insertOne(this)
}
return dpOp.then((res)=>{
}).catch(err=>{
  console.log(err)
})
  }

  static fetchAll(){
    let db = getDb()
    return db.collection('products').find().toArray()
    .then((res)=>{
      console.log(res)
      return res
    })
    .catch(err=>{
      console.log(err)
    })
  }

  static findById(prodId){
    let db = getDb()
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)}).next()
    .then((res)=>{
      return res
    })
    .catch(err=>console.log(err))
  }

  static delete(prodId){
    let db = getDb()
    return db.collection('products').deleteOne({_id:new  mongodb.ObjectId(prodId)}).then((res)=>{
      console.log(res)
      return res
    }).catch(err=>{
      console.log(err)
    })
  }
}

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Product = sequelize.define('product', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });

module.exports = Product;
