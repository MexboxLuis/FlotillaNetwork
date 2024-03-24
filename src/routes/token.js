const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../database/database");

const secret = process.env.SECRET;
const expiresIn = 86400; // Tiempo de expiración del token en segundos (24 horas)

// Ruta para la autenticación de usuarios y generación de token JWT
router.post("/login", (req, res) => {
  const { email, contraseña } = req.body;
  mysqlConnection.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (error, rows, fields) => {
      if (!error && rows.length > 0) {
        const usuario = rows[0];
        bcrypt.compare(contraseña, usuario.contraseña, (err, match) => {
          if (match) {
            const token = jwt.sign(
              {
                email: usuario.email,
                tipo: usuario.tipo,
                exp: Date.now() + expiresIn * 1000
              },
              secret
            );
            res.status(200).json({ token, expiresIn });
          } else {
            res.status(403).json({ error: "Credenciales incorrectas" });
          }
        });
      } else {
        res.status(403).json({ error: "Usuario no encontrado" });
      }
    }
  );
});

module.exports = router;
