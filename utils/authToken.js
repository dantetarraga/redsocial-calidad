const jwt = require("jsonwebtoken");

function generarToken(usuarioId) {
  const token = jwt.sign({ id: usuarioId }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  return token;
}

module.exports = generarToken;
