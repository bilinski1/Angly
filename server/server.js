const express = require('express')
const next = require('next')
const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const mongoose = require("mongoose");
const authRoutes = require("../routes/auth");

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
},
() => console.log("connected to db")
);

app
    .prepare()
    .then(() => {
  const server = express();
  //middlewares
  server.use(express.json()); //body parser
  server.use('/api/user', authRoutes);
  server.get('/api/shows', (req, res) => {
  return res.end("We made it!");
    });

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on ${port}`)
  });

})


.catch(ex => {
    console.error(ex.stack);
    process.exit(1);
});