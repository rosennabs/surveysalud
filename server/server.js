const express = require("express");
const app = express();
const cors = require("cors");

const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
  
  res.json({ message: "Welcome to PMBASE!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})


