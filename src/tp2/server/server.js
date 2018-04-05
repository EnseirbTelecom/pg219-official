var express = require("express")
var app = express()

var products = []

app.get("/products/:id", function(req, res) {
  res.json(products[req.params.id])
})

app.patch("/products/:id", function(req, res) {
  if(req.query.name) {
    products[req.params.id]["name"] = req.query.name
  }

  if(req.query.price) {
    products[req.params.id]["price"] = req.query.price
  }

  res.json(products[req.params.id])
})

app.delete("/products/:id", function(req, res) {
  products[req.params.id] = {}
  res.json(req.params.id)
})

app.post("/products", function(req, res) {
  product = {
    name: req.query.name,
    price: req.query.price
  }

  products[products.length] = product

  res.status(201).json(product)
})

app.get("/products", function(req, res) {
  res.json(products)
})


app.listen(3000, () => {
  console.log("En attente de requêtes...")
})
