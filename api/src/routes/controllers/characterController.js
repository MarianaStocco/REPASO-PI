const { Episode, Character } = require("../../db");
const axios = require('axios')

/**
 * Devuelve todos los personajes y sus episodios.
 */
const getCharacter = async () => {
    const characterFound = await Character.findAll({
        include: [{ model: Episode }],
    })
    if (characterFound.length === 0) {

        try {
          
            /* Obtener los datos de la API y asignarlos a la base de datos. */
            const url = await axios.get('https://rickandmortyapi.com/api/character')
            const apiInfo = await url.results.map((c) => {
                return {
                    id: c.id,
                    name: c.name,
                    species: c.species,
                    origin: c.origin.name,
                    image: c.image,
                    created: c.created
                }
            });

            /* Mapeo de los datos de la API a la base de datos. */
            apiInfo.map(async (c) => {
                await Character.findOrCreate({
                    where: {
                        id: c.id,
                        name: c.name,
                        species: c.species,
                        origin: c.origin.name,
                        image: c.image,
                        created: c.created
                    }
                })
            });
            /* Devolviendo los datos de la API. */
            return apiInfo;
        } catch (error) {
            console.log(error)
        }
    } else {
       /* Devolver los datos de la base de datos. */
        return characterFound
    }
}


module.exports = {getCharacter};