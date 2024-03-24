const { Router } = require("express");
const router = Router();
const mysqlConnection = require("../database/database");

// Obtener todos los documentos
router.get("/documentos", (req, res) => {
  mysqlConnection.query("SELECT * FROM documentos", (error, rows, fields) => {
    if (!error) {
      res.status(200).json(rows);
    } else {
      res.status(500).json({ error: error });
    }
  });
});

// Obtener un documento por su id
router.get("/documentos/:iddocumentos", (req, res) => {
  const { iddocumentos } = req.params;
  mysqlConnection.query(
    "SELECT * FROM documentos WHERE iddocumentos = ?",
    [iddocumentos],
    (error, rows, fields) => {
      if (!error) {
        if (rows.length === 0) {
          res.status(404).json({ error: "Documento no encontrado" });
        } else {
          res.status(200).json(rows[0]);
        }
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Crear un nuevo documento
router.post("/documentos", (req, res) => {
  const { placa, tipo, contenido } = req.body;
  mysqlConnection.query(
    "INSERT INTO documentos(placa, tipo, contenido) VALUES (?, ?, ?)",
    [placa, tipo, contenido],
    (error, result, fields) => {
      if (!error) {
        res.status(201).json({ Status: "Documento creado" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  );
});

// Eliminar un documento por su id
router.delete("/documentos/:iddocumentos", (req, res) => {
  const { iddocumentos } = req.params;
  mysqlConnection.query(
    "DELETE FROM documentos WHERE iddocumentos = ?",
    [iddocumentos],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Documento eliminado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

// Actualizar un documento por su id
router.put("/documentos/:iddocumentos", (req, res) => {
  const { iddocumentos } = req.params;
  const { placa, tipo, contenido } = req.body;
  mysqlConnection.query(
    "UPDATE documentos SET placa = ?, tipo = ?, contenido = ? WHERE iddocumentos = ?",
    [placa, tipo, contenido, iddocumentos],
    (error, result, fields) => {
      if (!error) {
        res.status(200).json({ Status: "Documento actualizado" });
      } else {
        res.status(500).json({ error: error });
      }
    }
  );
});

module.exports = router;
