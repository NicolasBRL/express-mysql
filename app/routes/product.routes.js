module.exports = (app) => {
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();
  
  router.post("/", products.create); // Crée un nouveau produit
  router.get("/", products.findAll); // Récupère tous les produits

  router.get("/categories/:id", products.findByCategory); // Récupère tous les produits d'une catégorie
  
  router.get("/:id", products.findOne); // Récupère un produit en fonction de son id
  router.put("/:id", products.update); // Modifie un produit
  router.delete("/:id", products.delete); // Supprime un produit

  
  router.delete("/", products.deleteAll); // Supprime tous les produits
  app.use("/api/products", router);
};
