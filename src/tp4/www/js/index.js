/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
const app = {
	// Application Constructor
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
    phonon.options({
        navigator: {
            defaultPage: 'home',
            animatePages: true,
            enableBrowserBackButton: true,
            templateRootDirectory: './tpl'
        },
        i18n: null // for this example, we do not use internationalization
    })
    const phononApp = phonon.navigator();

    phononApp.on({ page: 'home', preventClose: false, content: 'home.html', readyDelay: 1}, activity => {
      let loadProducts = () => {
        const ul = document.querySelector('#products');
        ul.innerHTML = ""
    		fetch("http://localhost:3000/products")
    			.then(res => res.json())
    			.then(json => {
    				json.forEach(product => {
    					const li = document.createElement('li')
              li.innerHTML = "<a href='#' data-id='" + product._id + "' class='pull-right icon icon-close delete'></a><a href='#!product/" + product._id + "' class='pull-right icon icon-edit'></a><span class='padded-list'>" + product.name + " (" + product.price + ")</span>"
    					ul.appendChild(li)
    				})
            document.querySelectorAll(".delete").on('tap', event => {
              event.preventDefault()
              id = event.target.getAttribute("data-id")
              fetch("http://localhost:3000/products/" + id, {
                method: "DELETE",
              }).then(res => {
                loadProducts()
              })
            })
    			})
      }

      activity.onReady(() => {
        loadProducts()
      })
    })

    phononApp.on({ page: 'product', preventClose: false, content: 'product.html', readyDelay: 1}, activity => {
      activity.onCreate(self => {
        document.querySelector('.primary').on('tap', () => {
          if (id) {
          fetch("http://localhost:3000/products/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: document.querySelector('#name').value,
              price: document.querySelector('#price').value
            })
          })
            .then(res => {
              id = undefined
              phonon.navigator().changePage('home')
            })
          }
          else {
            fetch("http://localhost:3000/products/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: document.querySelector('#name').value,
                price: document.querySelector('#price').value
              })
            })
            .then(res => {
              phonon.navigator().changePage('home')
            })
          }
        })
      })

      activity.onHashChanged(pId => {
        id = pId
        if (!id)
          return
        fetch("http://localhost:3000/products/" + id)
          .then(res => res.json())
    			.then(product => {
            document.querySelector('#name').value = product.name
            document.querySelector('#price').value = product.price
          })
	    })
    })
    phononApp.start()
	}
};

app.initialize();
