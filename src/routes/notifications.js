const { Router } = require("express");
const router = Router();
const mysqlConnection = require("../database/database");

// Obtener todas las notificaciones
router.get("/notificaciones", (req, res) => {
  mysqlConnection.query("SELECT * FROM notificaciones", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener una notificación por su id
router.get("/notificaciones/:idnotificaciones", (req, res) => {
  const { idnotificaciones } = req.params;
  mysqlConnection.query(
    "SELECT * FROM notificaciones WHERE idnotificaciones = ?",
    [idnotificaciones],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Notificación no encontrada" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear una nueva notificación
router.post("/notificaciones", (req, res) => {
  const { contenido, tipo, vehiculo_placa, id_usuario } = req.body;
  mysqlConnection.query(
    "INSERT INTO notificaciones(contenido, tipo, vehiculo_placa, id_usuario) VALUES (?, ?, ?, ?)",
    [contenido, tipo, vehiculo_placa, id_usuario],
    (error, result, fields) => {
      if (!error) {
        res.status(201).json({ Status: "Notificación creada" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  );
});

// Eliminar una notificación por su id
router.delete("/notificaciones/:idnotificaciones", (req, res) => {
  const { idnotificaciones } = req.params;
  mysqlConnection.query(
    "DELETE FROM notificaciones WHERE idnotificaciones = ?",
    [idnotificaciones],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Notificación eliminada" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar una notificación por su id
router.put("/notificaciones/:idnotificaciones", (req, res) => {
  const { idnotificaciones } = req.params;
  const { contenido, tipo, vehiculo_placa, id_usuario } = req.body;
  mysqlConnection.query(
    "UPDATE notificaciones SET contenido = ?, tipo = ?, vehiculo_placa = ?, id_usuario = ? WHERE idnotificaciones = ?",
    [contenido, tipo, vehiculo_placa, id_usuario, idnotificaciones],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Notificación actualizada" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
