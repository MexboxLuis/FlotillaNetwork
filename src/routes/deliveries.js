const { Router } = require("express");
const router = Router();
const mysqlConnection = require("../database/database");

// Obtener todas las entregas
router.get("/entregas", (req, res) => {
  mysqlConnection.query("SELECT * FROM entregas", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener una entrega por su id
router.get("/entregas/:identregas", (req, res) => {
  const { identregas } = req.params;
  mysqlConnection.query(
    "SELECT * FROM entregas WHERE identregas = ?",
    [identregas],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Entrega no encontrada" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear una nueva entrega
router.post("/entregas", (req, res) => {
  const { fecha_inicio, fecha_fin, destino, entregado, id_conductor } = req.body;
  mysqlConnection.query(
    "INSERT INTO entregas(fecha_inicio, fecha_fin, destino, entregado, id_conductor) VALUES (?, ?, ?, ?, ?)",
    [fecha_inicio, fecha_fin, destino, entregado, id_conductor],
    (error, result, fields) => {
      if (!error) {
        res.status(201).json({ Status: "Entrega creada" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  );
});

// Eliminar una entrega por su id
router.delete("/entregas/:identregas", (req, res) => {
  const { identregas } = req.params;
  mysqlConnection.query(
    "DELETE FROM entregas WHERE identregas = ?",
    [identregas],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Entrega eliminada" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar una entrega por su id
router.put("/entregas/:identregas", (req, res) => {
  const { identregas } = req.params;
  const { fecha_inicio, fecha_fin, destino, entregado, id_conductor } = req.body;
  mysqlConnection.query(
    "UPDATE entregas SET fecha_inicio = ?, fecha_fin = ?, destino = ?, entregado = ?, id_conductor = ? WHERE identregas = ?",
    [fecha_inicio, fecha_fin, destino, entregado, id_conductor, identregas],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Entrega actualizada" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
