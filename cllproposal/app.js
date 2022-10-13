const express = require('express')
const path = require('path');
const app = express()
const port = process.env.PORT || 3000;

/* Serve pages */
const pages = [
  {page: '/public/components/pages/index/index.html', route: ''},
  {page: '/public/components/pages/concept/static/static.html', route: 'concept/static'},
  {page: '/public/components/pages/concept/dynamic/dynamic.html', route: 'concept/dynamic'},
];

pages.forEach(e => {
  app.get(`/${e.route}`, (req, res) => {
    res.sendFile(path.join(__dirname, e.page));
  });
});

/* Serve static files */
app.use('/public', express.static(path.join(__dirname, 'public')))

/* Listen */
app.listen(port);
