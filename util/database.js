require('dotenv').config()
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient
let _db
const mongoConnect=(callback)=>{
  mongoClient.connect(`mongodb+srv://################################@cluster1.syv6z7h.mongodb.net/?retryWrites=true&w=majority`).then((res)=>{
    callback()
    _db=res.db()
    console.log(res,'result')}).catch((err)=>console.log(err,'eRROR'))
}

const getDb=()=>{
  if(_db){
    return _db
  }
  throw 'No Data Based Found'
}
exports.mongoConnect = mongoConnect ;
exports.getDb = getDb