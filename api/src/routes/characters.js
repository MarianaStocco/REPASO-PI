const { Router } = require("express");
const { Character, Episode } = require("../db");
const getCharacter = require('./controllers/characterController')

const router = Router();
// Configurar los routers
router.get('/', async (req, res) => {
    const { name } = req.query;
    let characterTotal = await getCharacter();
    try {
        if (name) {
           
         /* Filtrar los personajes por nombre. */
            let characterName = await characterTotal.filter(c =>
                c.name.toLowerCase().includes(name.toLocaleLowerCase()))
            characterName.length ?
                res.status(200).send(characterName) :
                res.status(404).send('Character not found')
        } else {
            res.status(200).send(characterTotal)
        }
    } catch (error) {
        res.send('Error')
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
 /* Encontrar el personaje por el id e incluir el modelo del episodio. */
        const characterFound = await Character.findByPK(id, {
            include: {
                model: Episode
            },
        });
        return res.send(characterFound);
    } catch (error) {
        console.log(error);
    }
});

router.post('/', async (req, res) => {
    const { name, origin, species, image, episode } = req.body;
    try {
   /* Creando un nuevo personaje. */
        const createCharacter = await Character.create({
            name,
            origin,
            species,
            image,
        })
       /* Encontrar el episodio por la identificación que se pasa en el cuerpo de la solicitud. */
        const findCharacter = await Episode.findAll({
            where :{
                id : episode,
            }
        });
       /* Agregar el episodio al personaje. */
        const response = await createCharacter.addEpisodes(findCharacter);
        console.log(req.body);

        return res.status(200).send({response, message: `El personaje ${name} ha sido creado`})

    } catch (error) {
        res.status(400).json({error : 'Los datos ingresados son incorrectos'})
    }
});



module.exports = router;