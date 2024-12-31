const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;




    const server = express();

    //Middleware
    server.use(cors());
    server.use(bodyParser.json());

    server.use("/api/user", require("./routes/userRoutes"));
    server.use("/api/program", require("./routes/programRoutes"));
    server.use("/api/knowledge_product", require("./routes/kpRoutes"));
    server.use("/api/relationship", require("./routes/relationshipRoutes"));
    server.use("/api/reporting", require("./routes/reportingRoutes"));

    // Handle other requests (Next.js)
    server.get("*", (req, res) => {
      res.status(404).send("Route not found"); // Placeholder if Next.js handler is not present
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server listening on http://localhost:${PORT}`);
    });

  






