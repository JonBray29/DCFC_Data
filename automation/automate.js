const csv = require('csvtojson');
const converter = require('json-2-csv')
const fs = require('fs');

propsToDelete = ['B365H','B365D','B365A','BWH','BWD','BWA','GBH','GBD','GBA','IWH','IWD','IWA','LBH','LBD','LBA','SBH','SBD','SBA','WHH','WHD','WHA','SJH','SJD','SJA','VCH','VCD','VCA','BSH','BSD','BSA','Bb1X2','BbMxH','BbAvH','BbMxD','BbAvD','BbMxA','BbAvA','BbOU','BbMx>2','BbAv>2','BbMx<2','BbAv<2','BbAH','BbAHh','BbMxAHH','BbAvAHH','BbMxAHA','BbAvAHA'];
managers = [{ name: "Paul Jewell", start: "28/11/07", end: "29/12/08"}, { name: "Chris Hutchings", start: "29/12/08", end: "06/01/09"}, { name: "David Lowe", start: "06/01/2009", end: "08/01/09"}, 
            { name: "Nigel Clough", start: "08/01/09", end: "28/09/13"}, { name: "Darren Wassall", start: "29/09/13", end: "01/10/13"}, { name: "Steve McClaren", start: "02/10/13", end: "25/05/15"},
            { name: "Paul Clement", start: "01/06/15", end: "07/02/16"}, { name: "Darren Wassall", start: "08/02/16", end: "26/05/16"}, { name: "Nigel Pearson", start: "27/05/16", end: "26/09/16"},
            { name: "Chris Powell", start: "27/09/16", end: "11/10/16"}, { name: "Steve McClaren", start: "12/10/16", end: "12/03/17"}, { name: "Gary Rowett", start: "14/03/17", end: "30/06/18"},
            { name: "Frank Lampard", start: "01/07/18", end: "03/07/19"}, { name: "Phillip Cocu", start: "05/07/19", end: "14/11/20"}, { name: "Liam Rosenior", start: "15/11/20", end: "26/11/20"},
            { name: "Wayne Rooney", start: "26/11/20", end: ""}];

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
