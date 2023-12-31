const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect= require('./util/database').mongoConnect

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('64a8e73c4ea6b865f4582793').then(ress=>{
    req.user = new User(ress.name, ress.email, ress.cart, ress._id)
next()
  }).catch(err=>{
console.log(err)
  })
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(()=>{
  // console.log(res)
  app.listen(4000,()=>{
    console.log('server is running')
  })
})