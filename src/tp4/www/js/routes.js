
var routes = [
  {
    path: '/',
    componentUrl: './pages/home.html'
  },
  {
    path: '/products/:productId?',
    componentUrl: './pages/product.html',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
