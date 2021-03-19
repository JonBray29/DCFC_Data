const csv = require('csvtojson');
const converter = require('json-2-csv');
const moment = require('moment');
const fs = require('fs');

propsToDelete = ['B365H','B365D','B365A','BSH','BSD','BSA','BWH','BWD','BWA','GBH','GBD','GBA','IWH','IWD','IWA','LBH','LBD','LBA','PSH','PH','PSD','PD','PSA','PA','SOH','SOD','SOA','SBH','SBD','SBA','SJH','SJD','SJA','SYH','SYD','SYA','VCH','VCD','VCA','WHH','WHD','WHA',
                'MaxH','MaxD','MaxA','AvgH','AvgD','AvgA','B365>2','B365<2','P>2','P<2','Max>2','Max<2','Avg>2','Avg<2','AHh','B365AHH','B365AHA','PAHH','PAHA','MaxAHH','MaxAHA','AvgAHH','AvgAHA','B365CH','B365CD','B365CA','BWCH','BWCD','BWCA','IWCH','IWCD','IWCA','PSCH',
                'PSCD','PSCA','WHCH','WHCD','WHCA','VCCH','VCCD','VCCA','MaxCH','MaxCD','MaxCA','AvgCH','AvgCD','AvgCA','B365C>2','B365C<2','PC>2','PC<2','MaxC>2','MaxC<2','AvgC>2','AvgC<2','AHCh','B365CAHH','B365CAHA','PCAHH','PCAHA','MaxCAHH','MaxCAHA','AvgCAHH','AvgCAHA',
                'Bb1X2','BbMxH','BbAvH','BbMxD','BbAvD','BbMxA','BbAvA','BbOU','BbMx>2','BbAv>2','BbMx<2','BbAv<2','BbAH','BbAHh','BbMxAHH','BbAvAHH','BbMxAHA','BbAvAHA'];

getData();

async function getData(){

    const managers = await csv().fromFile('../Derby managers.csv');
    managers[managers.length - 1].end = Date.now();

    for(let i = 8; i < 21; i++){
        let csvFilePath = '../Existing Data/' + i + '-' + (i + 1) + '.csv';
        const jsonArray = await csv().fromFile(csvFilePath);
        let derbyArray = [];

        jsonArray.forEach(function(game){
            if(game.HomeTeam == "Derby" || game.AwayTeam == "Derby"){
                propsToDelete.forEach(function(property){
                    delete game[property]
                });

                let day = game.Date.substring(0, 2);
                let month = game.Date.substring(3, 5);
                let year = game.Date.substring(6);
                game.Date = year + '-' + month + '-' + day;

                managers.forEach(function(manager){
                    if(moment(game.Date) >= moment(manager.start) && moment(game.Date) <= moment(manager.end)){
                        game.Manager = manager.name;
                    }
                });

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
