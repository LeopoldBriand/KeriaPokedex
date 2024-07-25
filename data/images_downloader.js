const axios = require('axios');
const fs = require('fs');
const client = require('https');

async function downloadImages() {
    champions = (await axios.get('https://ddragon.leagueoflegends.com/cdn/14.9.1/data/en_GB/champion.json')).data.data;
    console.log(champions)
    for (let name in champions) {
        if (champions[name].image) {
            await downloadImage(
                `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${champions[name].image.full}`,
                `../client/public/images/champions/${champions[name].image.full}` 
            )
        }
    }
}

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}

downloadImages()