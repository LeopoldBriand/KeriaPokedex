const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function fetchData() {
    try {
        const response = await axios.get(
            'https://lol.fandom.com/Special:RunQuery/TournamentStatistics?TS%5Bpreload%5D=PlayerByChampion&TS%5Bteam%5D=T1&TS%5Bspl%5D=Yes&TS%5Blink%5D=Keria&_run='
        );
        const html = response.data;
        const $ = cheerio.load(html);
        ''
        let rows = $('table.spstats').find('tbody').children();
        rows.splice(0,3);
        rows.splice(rows.length-2, 2);
        let infos = [];
        for (const [key, value] of Object.entries(rows)) {
            if(Number(key) || key == '0') {
                let info = {champion: null, win: null, loose: null, kda: null}
                let datas = value.children.map(el => {
                    if (el.attribs && el.attribs.class && el.attribs.class == 'spstats-subject') {
                        return el.children[0].children[1].children[0].data
                    } else if (el.children[0].children){
                        return el.children[0].children[0].data
                    } else {
                        return el.children[0].data
                    }
                })
                info.champion = datas[0];
                info.win = datas[1];
                info.loose = datas[2];
                info.kda = datas[8];
                infos.push(info)
            }
        }
        // Need to replace Wukon and renata names
        fs.writeFileSync('../client/public/data.json', JSON.stringify(infos));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();