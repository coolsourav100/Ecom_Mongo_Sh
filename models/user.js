const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class User{
  constructor(username , email , cart ,id){
    this.username = username 
    this.email = email 
    this.cart = cart
    this._id = id
  }

  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)

  }
  addToCart(product){
const cartProductIndex = this.cart.items.findIndex(item=>{
  if(item){
  return item.prodId.toString() === product._id.toString()
  }
})

let newQuantity = 1
const updatedCartItem = [...this.cart.items]
if(cartProductIndex>=0){
  newQuantity = this.cart.items[cartProductIndex].quantity + 1
  updatedCartItem[cartProductIndex].quantity = newQuantity
}else{
  updatedCartItem.push({prodId:new mongodb.ObjectId(product._id),quantity:newQuantity})
}
const updatedCart = {items: updatedCartItem}


  }

deleteItemFromCart(prodId){
const updatedCartItem = this.cart.items.filter(item=>{
  return item.prodId != prodId
})

let db = getDb()
return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{cart:{items:updatedCartItem}}})
}

getCart(){
  let db = getDb()
const prodIds = this.cart.items.map((item)=>item.prodId)
  return db.collection('products').find({_id:{$in:prodIds}}).toArray().then(products=>{
return products.map(p=>{
  return {...p,quantity: this.cart.items.find(i=>{
   
    return i.prodId == p._id.toString()
      }).quantity}
    })
  })
}

  static findById(prodId){
    const db = getDb()
    return db.collection('users').find({_id:new  mongodb.ObjectId(prodId)}).
    next()
  }
}
module.exports = User;