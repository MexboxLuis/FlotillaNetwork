const { Router } = require("express");
const router = Router();
const mysqlConnection = require("../database/database");

// Obtener todos los registros de mantenimiento
router.get("/mantenimiento", (req, res) => {
  mysqlConnection.query("SELECT * FROM mantenimiento", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener un registro de mantenimiento por su id
router.get("/mantenimiento/:idmantenimiento", (req, res) => {
  const { idmantenimiento } = req.params;
  mysqlConnection.query(
    "SELECT * FROM mantenimiento WHERE idmantenimiento = ?",
    [idmantenimiento],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Registro de mantenimiento no encontrado" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear un nuevo registro de mantenimiento
router.post("/mantenimiento", (req, res) => {
  const { tipo, vehiculo_placa, fecha } = req.body;
  mysqlConnection.query(
    "INSERT INTO mantenimiento(tipo, vehiculo_placa, fecha) VALUES (?, ?, ?)",
    [tipo, vehiculo_placa, fecha],
    (error, result, fields) => {
      if (!error) {
        res.status(201).json({ Status: "Registro de mantenimiento creado" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  );
});

// Eliminar un registro de mantenimiento por su id
router.delete("/mantenimiento/:idmantenimiento", (req, res) => {
  const { idmantenimiento } = req.params;
  mysqlConnection.query(
    "DELETE FROM mantenimiento WHERE idmantenimiento = ?",
    [idmantenimiento],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Registro de mantenimiento eliminado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar un registro de mantenimiento por su id
router.put("/mantenimiento/:idmantenimiento", (req, res) => {
  const { idmantenimiento } = req.params;
  const { tipo, vehiculo_placa, fecha } = req.body;
  mysqlConnection.query(
    "UPDATE mantenimiento SET tipo = ?, vehiculo_placa = ?, fecha = ? WHERE idmantenimiento = ?",
    [tipo, vehiculo_placa, fecha, idmantenimiento],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Registro de mantenimiento actualizado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
