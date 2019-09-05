var express = require('express');
var router = express.Router();
var xlsx = require('xlsx')
var file = xlsx.readFile('./public/prices.xlsx')



function formatSheet(sheet){
    ref = sheet["!ref"]

    letters = ['A','B','C','D','E','F','G']
    usedLetters = []

    for(var i = 0;i<=letters.indexOf(ref.charAt(3));i++){
        usedLetters += [letters[i]]
    }
    lastLetter = letters.indexOf(ref.charAt(3))
    lastNumber = ref.charAt(4)

    prices = []

    stillNumbers = true
    i = 0
    stillLetters = true
    j = 1
    while(stillNumbers){
        dateinfo = []
        i = 0

        while(stillLetters){
            key = letters[i]+String(j)
            if(sheet[key] !== undefined){
                dateinfo.push(sheet[key].w)
            }
            else{
                stillLetters = false
            }
            i++
        }
        prices.push(dateinfo)
        j++
        stillLetters = true

        
        key = letters[0]+String(j+1)
        if(sheet[key] === undefined){
            stillNumbers = false
        }
    }
    return prices
}

/* GET home page. */
router.get('/', function(req, res, next) {

    var sheets = file.Sheets
    var sheetNames = file.SheetNames

    var rates = []

    for(var i = 0; i<sheetNames.length; i++){
        rates.push(formatSheet(sheets[sheetNames[i]]))
    }

    res.json({rates:rates})
});

module.exports = router;