const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Listar consultas');
});

module.exports = router;