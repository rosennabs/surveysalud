const express = require("express");
const next = require("next");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;
const path = require("path");


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: path.join(__dirname, "../src") });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    //Middleware 
    server.use(cors());
    server.use(bodyParser.json());


    server.use('/api/user', require('./routes/userRoutes'))
    server.use('/api/program', require('./routes/programRoutes'))
    server.use('/api/knowledge_product', require('./routes/kpRoutes'))
    server.use('/api/relationship', require('./routes/relationshipRoutes'))
    server.use('/api/reporting', require('./routes/reportingRoutes'))

    // Custom Next.js request handler
    server.get("*", (req, res) => {
      return handle(req, res);
    });


    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  






