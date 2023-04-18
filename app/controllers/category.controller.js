const Category = require("../models/category.model.js");

// Création et sauvegarde d'un produit
exports.create = (req, res) => {
  // Validation de la requete
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide",
    });
  }

  // Création de la catégorie
  const category = new Category({
    name: req.body.name,
  });

  // sauvegarde de la catégorie dans la base de données
  Category.create(category, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "apparition d'erreurs lors de la création d'une catégorie",
      });
    else res.send(data);
  });
};

//Récupération de toutes les catégories
exports.findAll = (req, res) => {
  const name = req.query.name;
  Category.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erreurs lors de la récupération des catégories",
      });
    else res.send(data);
  });
};

// Récupération d'une catégorie en fonction de son identifiant
exports.findOne = (req, res) => {
  Category.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucune catégorie trouvée") {
        res.status(404).send({
          message: `Pas de catégorie avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération de la catégorie avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Modification d'une catégorie
exports.update = (req, res) => {
  // Validation de la requête
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu ne peut être vide!",
    });
  }
  console.log(req.body);
  Category.updateById(req.params.id, new Category(req.body), (err, data) => {
    if (err) {
      if (err.kind === "Aucune catégorie trouvée") {
        res.status(404).send({
          message: `Pas de catégorie avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Erreur de récupération de la catégorie avec l'identifiant " +
            req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Suppression d'un produit
exports.delete = (req, res) => {
  Category.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Aucun produit trouvé") {
        res.status(404).send({
          message: `Pas de produit avec l'id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Impossible de supprimé la catégorie avec l'id " + req.params.id,
        });
      }
    } else res.send({ message: `La catégorie a été supprimée avec succès!` });
  });
};

// Suppression de toutes les catégories
exports.deleteAll = (req, res) => {
  exports.deleteAll = (req, res) => {
    Category.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message ||
            "Apparition d'erreurs lors de la suppression de toutes les catégories.",
        });
      else res.send({ message: `Toutes les catégories ont été supprimées!` });
    });
  };
};
