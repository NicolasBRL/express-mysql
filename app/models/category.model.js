const sql = require("./db.js");

// Le constructeur
const Category = function (category) {
  this.name = category.name;
};

// Créer une catégorie
Category.create = (newCatagory, result) => {
  sql.query("INSERT INTO categories SET ?", newCatagory, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created category: ", { id: res.insertId, ...newCatagory });
    result(null, { id: res.insertId, ...newCatagory });
  });
};

// Affichage d'une catégorie grâce à son identifiant
Category.findById = (id, result) => {
  sql.query(`SELECT * FROM categories WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Catégorie trouvée: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "Aucune catégorie ne correspond" }, null);
  });
};

// Affichage de toutes les catégories
Category.getAll = (name, result) => {
  let query = "SELECT * FROM categories";
  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log("Catégories: ", res);
    result(null, res);
  });
};

//Modification d'une catégorie
Category.updateById = (id, category, result) => {
  sql.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [category.name, id],
    (err, res) => {
      if (err) {
        console.log("Erreur: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "Aucune catégorie ne correspond" }, null);
        return;
      }
      console.log("Catégorie modifié: ", { id: id, ...category });
      result(null, { id: id, ...category });
    }
  );
};

// Suppression d'une catégorie
Category.remove = (id, result) => {
  sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Category with the id
      result({ kind: "Aucune catégorie ne correspond" }, null);
      return;
    }
    console.log("Suppression de la catégorie avec l'identifiant: ", id);
    result(null, res);
  });
};

// Suppression de toutes les catégories
Category.removeAll = (result) => {
  sql.query("DELETE FROM categories", (err, res) => {
    if (err) {
      console.log("Erreur: ", err);
      result(null, err);
      return;
    }
    console.log(`Suppression de ${res.affectedRows} catégories`);
    result(null, res);
  });
};

module.exports = Category;
