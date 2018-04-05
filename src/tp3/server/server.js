const express = require("express")
const app = express()

// Middle nous permettant de parser le corps de nos requetes
const bodyParser = require("body-parser")

// Permet au middleware de parser toutes les requetes ayant un body JSON
app.use(bodyParser.json())
// Permet au middleware de parser toutes les requetes ayant un body FORM
app.use(bodyParser.urlencoded({ extended: false }))


// Middleware pour vérifier la l'existence d'une clé
const apiKeyChecker = (req, res, next) => {
  if (!req.get("API-KEY")) res.status(403).send("Accès refusé!")
  else next()
}

// Notre middleware pour vérifier que chaque requete a une clé d'API
app.use(apiKeyChecker)


// Partie mongo
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/products_manager';

// On ouvre une connexion à notre base de données
MongoClient.connect(url)
  // On commence par récupérer la collection que l'on va utiliser et la passer
  .then(function (client) {
    return client.db("products_manager").collection("products")
  })
  .then((products) => {
    app.get("/products/:id", function(req, res) {
      products.findOne({_id: ObjectID(req.params.id)})
              .then((item) => {
                res.json(item)
              })
    })

    app.put("/products/:id", function(req, res) {
      products.update({_id: ObjectID(req.params.id)},
                      {$set: {
                          name: req.body.name,
                          price: req.body.price
                       }
                     }).then(() => {
                       res.json(req.body)
                     })
    })

    app.patch("/products/:id", function(req, res) {
      if (req.body.name && req.body.price)
        res.json({"error": "You should use the PUT method."})

      product = {}

      if(req.body.name) {
        product["name"] = req.body.name
      }

      if(req.body.price) {
        product["price"] = req.body.price
      }

      products.update({_id: ObjectID(req.params.id)}, {$set: product})
              .then(() => {
                res.json(req.body)
              })
    })

    app.delete("/products/:id", function(req, res) {
      products.remove({_id: ObjectID(req.params.id)}).then(() =>{
          res.json(req.params.id)
      })
    })

    app.post("/products", function(req, res) {
      product = {
        name: req.body.name,
        price: req.body.price
      }

      products.insert(product).then(() => {
        res.status(201).json(product)
      })
    })

    app.get("/products", function(req, res) {
      products.find().toArray()
      .then((err, items) => {
        if (err) throw err;
        res.json(items)
      })
      .catch(err => {
        console.log(err)
        res.json([])
      })
    })

    app.listen(3000, () => {
      console.log("En attente de requêtes...")
    })
  })
  .catch(function (err) {
    throw err;
  })
