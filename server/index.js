const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;

const server = express();

//Middleware
server.use(cors());
server.use(bodyParser.json());

server.use("/api/user", require("./routes/userRoutes"));
server.use("/api/child_vaccination", require("./routes/childVaccinationRoute"));
server.use("/monthly_entries", require("./routes/childVaccinationRoute"));
server.use("/api/antenatal_survey", require("./routes/antenatalRoute"));
server.use("/monthly_entries", require("./routes/antenatalRoute"));
server.use("/api/child_nutrition", require("./routes/childNutritionRoute"));
server.use("/monthly_entries", require("./routes/childNutritionRoute"));
server.use("/api/postnatal_survey", require("./routes/postnatalRoute"));
server.use("/monthly_entries", require("./routes/postnatalRoute"));
server.use("/api/surveys", require("./routes/surveyRoute"));

// Handle other requests (Next.js)
server.get("*", (req, res) => {
  res.status(404).send("Route not found"); // Placeholder if Next.js handler is not present
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${PORT}`);
});
