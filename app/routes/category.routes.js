module.exports = (app) => {
  const categories = require("../controllers/category.controller.js");
  var router = require("express").Router();
  
  router.post("/", categories.create); // Crée un nouveau produit
  router.get("/", categories.findAll); // Récupère tous les produits
  
  router.get("/:id", categories.findOne); // Récupère un produit en fonction de son id
  router.put("/:id", categories.update); // Modifie un produit
  router.delete("/:id", categories.delete); // Supprime un produit

  
  router.delete("/", categories.deleteAll); // Supprime tous les produits
  app.use("/api/categories", router);
};
