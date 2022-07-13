const { Episode, Character } = require("../../db");
const axios = require('axios')

const getEpisodes = async () => {
    if (!(await Episode.finAll()).length) {
        const nPages = await axios.get('https://rickandmortyapi.com/api/episode')
            .data.info.pages;
        const links = [];
        for (let i = 1; i <= nPages; i++) {
            links.push(`https://rickandmortyapi.com/api/episode?page=${i}`);
        }
        const data = await Promise.all(links.map((link) => axios.get(link)));
        const episodes = data.map((el) => el.data.results).flat();

        await Episode.bulkCreate(episodes);
        console.log('Creados');
    } else {
        console.log('Ya hay episodios');
    }
}





module.exports = { getEpisodes }