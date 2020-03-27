# API for product storage

## Installation

You need to run `npm install` before running the code. Then you have to launch mongodb on your machine. You can launch the server by running `npm start`.

## Available routes

* GET http://localhost:3000/products
* POST http://localhost:3000/products (Les valeurs pour créer le produit seront passés dans le body cette fois)
* PUT http://localhost:3000/products/5abe4657f5ff2b223adfadb3 (Permet de mettre à jour le nom et prix en même temps, les valeurs sont passés dans le body de la requête)
* PATCH http://localhost:3000/products/5abe4657f5ff2b223adfadb3 (Permet de mettre soit le nom, soit le prix, les valeurs seront passées dans le body de la rêquete)
* DELETE http://localhost:3000/products/5abe4657f5ff2b223adfadb3 (Aucun paramètre supplémentaire à passer en dehors de l’identifiant)
