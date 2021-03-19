const csv = require('csvtojson');
const converter = require('json-2-csv')
const fs = require('fs');

propsToDelete = ['B365H','B365D','B365A','BWH','BWD','BWA','GBH','GBD','GBA','IWH','IWD','IWA','LBH','LBD','LBA','SBH','SBD','SBA','WHH','WHD','WHA','SJH','SJD','SJA','VCH','VCD','VCA','BSH','BSD','BSA','Bb1X2','BbMxH','BbAvH','BbMxD','BbAvD','BbMxA','BbAvA','BbOU','BbMx>2','BbAv>2','BbMx<2','BbAv<2','BbAH','BbAHh','BbMxAHH','BbAvAHH','BbMxAHA','BbAvAHA'];
getData();

async function getData(){
    for(let i = 8; i < 21; i++){
        let csvFilePath = '../Existing Data/' + i + '-' + (i + 1) + '.csv';
        const jsonArray = await csv().fromFile(csvFilePath);
        let derbyArray = [];

        jsonArray.forEach(function(game){
            if(game.HomeTeam == "Derby" || game.AwayTeam == "Derby"){
                propsToDelete.forEach(function(property){
                    delete game[property]
                });

                if()

                derbyArray.push(game);
            }
        });

        converter.json2csv(derbyArray, (err, csv) => {
            if(err) throw err;


            if(i < 10){
                if((i + 1) < 10){
                    fs.writeFileSync('../Derbys data/0' + i + '-0' + (i + 1) + '.csv', csv);
                }
                else{
                    fs.writeFileSync('../Derbys data/0' + i + '-' + (i + 1) + '.csv', csv);
                }
            }
            else{
                fs.writeFileSync('../Derbys data/' + i + '-' + (i + 1) + '.csv', csv);
            }
        });
    }
}
