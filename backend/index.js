const http = require('http');
const database = require("./database");
const hostname = '127.0.0.1';
const port = 5000;
const cors = require("cors")
http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end();
});

var express = require('express');
var app = express();
var bodyParser = require("body-parser"); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.get('/', (req, res) => {
  res.send('<meta http-equiv="refresh" content="durée;URL=http://valjang.fr">')
  console.log('Redirect To domaine API')
});



app.get('/client', (req, res) => {
  database.getClient( (err, client) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(client);
  }, null);
});

app.get('/admin', (req, res) => {
  database.getadmin( (err, Model) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(Model);
  }, null);
});


app.get('/model', (req, res) => {
  database.getModel( (err, Model) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(Model);
  }, null);
});



app.get('/users', (req, res) => {
  database.getUsers( (err, users) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(users);
  }, null);
});

app.get('/products', (req, res) => {
  database.getProducts( (err, products) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(products);
  }, null);
});

app.get('/basket/:id', (req, res) => {
  database.getBasket( (err, basket) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(basket);
  }, req.params.id);
});

app.get('/basket', (req, res) => {
  database.displayCart( (err, basket) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(basket);
  },);
});

app.get('/products/category=:category', (req, res) => {
  database.getProductsByCategory( (err, products) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(products);
  }, req.params.category);
});


app.post('/addbasket', (req, res) => {
 
  database.addBasket( (err, basket) => {

    if (err) return res.status(500).send(err);
    return res.status(200).send(basket);
  }, req.body.id,req.body.quantity, req.body.products_id,req.body.users_id);
});

app.delete('/delmodel/:id', (req, res) => {
  database.delModel( (err, model) => {

    if (err) return res.status(500).send(err);
    return res.status(200).send(model);
  }, req.params.id);
});

app.delete('/delproduct/:id', (req, res) => {
  database.delProduct( (err, basket) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(basket);
  }, req.params.id);
});


app.patch('/users', (req, res) => {
  database.updateUser((err, user) => {
    console.log(`User -${req.body.firstname}- updated.`);
    if (err) return res.status(500).send(err);
    else return res.status(200).send(user);
  }, req.body) 
})

app.post('/user/login', (req, res) => {
  database.loginUser( (err, user) => {
    if (err) return res.status(500).send(err);
    else if (!user) return res.status(500).send("Bad informations ...");
    console.log('User', user)
    return res.status(200).send(user)
  }, req.body);
});

app.post('/user/adduser', (req, res) => {
 
  database.addUser( (err, user) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(user);
  }, req.body.firstname, req.body.lastname,req.body.mail,req.body.password);
});

app.post('/addmodel', (req, res) => {
 
  database.addModel( (err, Model) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(Model);
  }, req.body.name, req.body.description, req.body.Link,req.body.price,req.body.type,req.body.image,req.body.size,req.body.tag,req.body.statut);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});