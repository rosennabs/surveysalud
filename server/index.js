const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 8080;

const server = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000", // local frontend
      process.env.NEXT_PUBLIC_FRONTEND_URL ||
        "https://surveysalud.vercel.app", // Production frontend
    ];

    // Allow Vercel preview URLs dynamically
    const isVercelPreview = origin && origin.endsWith(".vercel.app");

    // Check if origin is allowed
    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  methods: "GET,POST,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"], // Add other headers as needed
};

//Middleware
server.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests
server.options("*", cors(corsOptions));

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
server.use("/api/total_entries", require("./routes/totalEntriesRoute"));

// Handle other requests (Next.js)
server.get("*", (req, res) => {
  res.status(404).send("Route not found"); // Placeholder if Next.js handler is not present
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server listening on http://localhost:${PORT}`);
});
