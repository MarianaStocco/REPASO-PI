const { Router } = require("express");


// Configurar los routers
const getCharacter = require('./characters.js');
const getEpisodes = require('./episodes.js')

const router = Router();

router.use('/characters', getCharacter)
router.use('/episodes', getEpisodes)


module.exports = router;
