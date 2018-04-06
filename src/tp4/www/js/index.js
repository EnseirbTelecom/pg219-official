const app = {

	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function() {
    phonon.options({
        navigator: {
            defaultPage: 'home',
            animatePages: true,
            enableBrowserBackButton: true,
            templateRootDirectory: './tpl'
        },
        i18n: null
    })
    const phononApp = phonon.navigator();

    phononApp.on({ page: 'home', preventClose: false, content: 'home.html', readyDelay: 1}, activity => {
      function loadProducts() {
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
              let id = event.target.getAttribute("data-id")
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
      activity.id = null
      activity.onCreate(self => {
        document.querySelector('.primary').on('tap', () => {
          if (activity.id) {
            fetch("http://localhost:3000/products/" + activity.id, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: document.querySelector('#name').value,
                price: document.querySelector('#price').value
              })
            })
              .then(res => {
                activity.id = null
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

      activity.onHashChanged(id => {
        activity.id = id
        if (!activity.id) {
          document.querySelector('#name').value = ""
          price: document.querySelector('#price').value = ""
        }
        else {
          fetch("http://localhost:3000/products/" + activity.id)
            .then(res => res.json())
      			.then(product => {
              document.querySelector('#name').value = product.name
              document.querySelector('#price').value = product.price
            })
        }
	    })
    })
    phononApp.start()
	}
};

app.initialize();
