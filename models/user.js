const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

class User{
  constructor(username , email){
    this.username = username 
    this.email = email 
  }

  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)

  }
  static findById(prodId){
    const db = getDb()
    return db.collection('users').find({_id:new  mongodb.ObjectId(prodId)}).
    next()
  }
}
module.exports = User;