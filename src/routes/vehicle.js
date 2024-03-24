const { Router } = require("express");
const router = Router();
const mysqlConnection = require("../database/database");

// Obtener todos los vehículos
router.get("/vehiculo", (req, res) => {
  mysqlConnection.query("SELECT * FROM vehiculo", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener un vehículo por su placa
router.get("/vehiculo/:placa", (req, res) => {
  const { placa } = req.params;
  mysqlConnection.query(
    "SELECT * FROM vehiculo WHERE placa = ?",
    [placa],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Vehículo no encontrado" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear un nuevo vehículo
router.post("/vehiculo", (req, res) => {
  const { placa, modelo, capacidad, altura, estado } = req.body;
  mysqlConnection.query(
    "INSERT INTO vehiculo(placa, modelo, capacidad, altura, estado) VALUES (?, ?, ?, ?, ?)",
    [placa, modelo, capacidad, altura, estado],
    (error, result, fields) => {
      if (!error) {
        res.status(201).json({ Status: "Vehículo creado" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  );
});

// Eliminar un vehículo por su placa
router.delete("/vehiculo/:placa", (req, res) => {
  const { placa } = req.params;
  mysqlConnection.query(
    "DELETE FROM vehiculo WHERE placa = ?",
    [placa],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Vehículo eliminado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar el estado de un vehículo por su placa
router.put("/vehiculo/:placa", (req, res) => {
  const { placa } = req.params;
  const { estado } = req.body;
  mysqlConnection.query(
    "UPDATE vehiculo SET estado = ? WHERE placa = ?",
    [estado, placa],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Estado del vehículo actualizado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
