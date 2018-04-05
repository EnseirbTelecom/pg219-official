const express = require("express")
const app = express()

// Express middleware to parse requests' body
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/products_manager';

MongoClient.connect(url)
	.then(client => client.db("products_manager").collection("products"))
	.then(products => {
		app.get("/products/:id", (req, res) => {
			products.findOne({ _id: ObjectID(req.params.id) })
				.then(item => (item) ? res.json(item) : res.status(404).json({ error: "Entity not found." }))
				.catch(err => console.log("err" + err))
		})

		app.put("/products/:id", (req, res) => {
			const product = {
				name: req.body.name,
				price: req.body.price
			}
			products.update({ _id: ObjectID(req.params.id) }, { $set: product })
				.then(command => (command.result.n == 1) ? res.json(req.body) : res.status(404).json({ error: "Entity not found." }))
				.catch(err => console.log("Error " + err))
		})

		app.patch("/products/:id", (req, res) => {
			if (req.body.name && req.body.price) {
				res.status(400)
				res.json({ error: "You should use the PUT method." })
			}

			const product = {}
			if (req.body.name)
				product.name = req.body.name
			if (req.body.price)
				product.price = req.body.price

			products.update({ _id: ObjectID(req.params.id) }, { $set: product })
				.then(command => (command.result.n == 1) ? res.json(req.body) : res.status(404).json({ error: "Entity not found." }))
				.catch(err => console.log("Error: " + err))
		})

		app.delete("/products/:id", (req, res) => {
			products.remove({ _id: ObjectID(req.params.id) })
				.then(command => (command.result.n == 1) ? res.json(req.params.id) : res.status(404).json({ error: "Entity not found." }))
		})

		app.post("/products", (req, res) => {
			const product = {
				name: req.body.name,
				price: req.body.price
			}
			products.insert(product)
				.then(command => res.status(201).json(product))
		})

		app.get("/products", (req, res) => {
			products.find().toArray()
				.then(items => res.json(items))
		})

		app.listen(3000, () => console.log("Awaiting requests."))
	})
	.catch(err => { throw err })
