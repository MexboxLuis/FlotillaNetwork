const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const mysqlConnection = require("../database/database");

// Obtener todos los usuarios
router.get("/usuarios", (req, res) => {
  mysqlConnection.query("SELECT * FROM usuarios", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener un usuario por su email
router.get("/usuarios/:email", (req, res) => {
  const { email } = req.params;
  mysqlConnection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Usuario no encontrado" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear un nuevo usuario
router.post("/usuarios", (req, res) => {
  const { email, nombre, numero, direccion, contraseña, tipo } = req.body;
  bcrypt.hash(contraseña, 10, (err, hash) => {
    if (!err) {
      mysqlConnection.query(
        "INSERT INTO usuarios(email, nombre, numero, direccion, contraseña, tipo) VALUES (?, ?, ?, ?, ?, ?)",
        [email, nombre, numero, direccion, hash, tipo],
        (error, result, fields) => {
          if (!error) {
            res.status(201).json({ Status: "Usuario creado" });
          } else {
            res.status(400).json({ error: error });
          }
        }
      );
    } else {
      res.status(500).json({ error: "Error de encriptación" });
    }
  });
});

// Eliminar un usuario por su email
router.delete("/usuarios/:email", (req, res) => {
  const { email } = req.params;
  mysqlConnection.query(
    "DELETE FROM usuarios WHERE email = ?",
    [email],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Usuario eliminado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar el tipo de un usuario por su email (simulación)
router.put("/usuarios/:email", (req, res) => {
  const { email } = req.params;
  const { tipo } = req.body;
  mysqlConnection.query(
    "UPDATE usuarios SET tipo = ? WHERE email = ?",
    [tipo, email],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Tipo de usuario actualizado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
