const express = require('express')
const bodyParser = require("body-parser");
const next = require('next')
    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => {
  const server = express()

  // parse requests of content-type - application/json
  server.use(bodyParser.json());

  // parse requests of content-type - application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use('/api/person', require('./app/person.routes'))
  server.get('*', (req, res) => {
    return handle(req, res)
  })
    
  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })

  const db = require("./app/models");
  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch(err => {
      console.log("Cannot connect to the database!", err);
    });
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})