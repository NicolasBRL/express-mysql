const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Bienvenu au pays du dev!" });
});

// Route product
require("./app/routes/product.routes.js")(app); 

// Route category
require("./app/routes/category.routes.js")(app); 

// Renseigne les port d'écoute pour les requêtes
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
