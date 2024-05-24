const express = require("express");
const next = require("next");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;
const path = require("path");
const { saveUser } = require('./db');



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

    server.get("/api/home", (req, res) => {
      res.json({ message: "Welcome to PMBASE!" });
    });

    server.post("/api/register", async (req, res) => {
      try {
        const user = await saveUser(req.body);
        res.status(201).json(user);
      } catch (error) {
        console.error("Error saving user to database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // Custom Next.js request handler
    server.get("*", (req, res) => {
      return handle(req, res);
    });


    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  






