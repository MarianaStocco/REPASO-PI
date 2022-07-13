const { Router } = require("express");
const { getEpisodes } = require("./controllers/episodeController");

const router = Router();

/* Este es un controlador de ruta. Es una función que se llama cuando se realiza una solicitud a la
ruta especificada. */
router.get('/', async (req, res) => {
    const { name } = req.query;
    let episodesTotal = await getEpisodes();
    try {
        /* Filtrado de la matriz de episodiosTotal por la propiedad de nombre pasado a minúscula que incluya el nombre de la base de datos también en minúscula. */
        if (name) {
            let episodeName = await episodesTotal.filter(e =>
                e.name.toLowerCase().includes(name.toLowerCase()))
            episodeName.length ?
                res.status(200).send(episodeName) :
                res.status(404).send('Episode not found')
        } else {
            res.status(200).send(episodesTotal)
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;