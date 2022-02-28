const express = require('./node_modules/express');
// Add require
const fs = require('fs');
const app = express();
// Read the data
const data = fs.readFileSync('./data_prospect.json');
const dados = data['prospects'];
// Transform the data into javascript file
var words = JSON.parse(data);
var newArray = {
    'prospects': []
};

var deleteProspect = function(req, res) {

	// get the delete form value
    var dd = req.body;

    // Name of the object that we will delete
    var namepros = dd.namedel.toLowerCase();

	// Counter
    var nindex = 0;

    // Using for to emulate the forEach function
    for (let i = 0; i < words['prospects'].length; i++) {

        var k = words['prospects'][nindex],
            objectData = JSON.stringify(k).toLowerCase();

        // If this object has the same name of the object that we want to delete so the code do not include him on the Array 'newArray'
        if (objectData.indexOf(namepros) != -1 && nindex + 1 < words['prospects'].length) {

            nindex++;
        }

        // If this object hasn't the same name of the object that we want to delete so the code include him on the Array 'newArray'
        else if (objectData.indexOf(namepros) == -1 && nindex + 1 < words['prospects'].length) {
            newArray['prospects'].push(words['prospects'][nindex]);
            nindex++;

        }

        // If this object has the same name of the object that we want to delete AND its the last object on the json data so we only run the writeYes() function
        else if (objectData.indexOf(namepros) != -1 && nindex + 1 == words['prospects'].length) {
            writeYes();
            nindex++;
        }

        // If this object hasn't the same name of the object that we want to delete AND its the last object on the json data so we push him on the new array and run the writeYes() function
        else if (objectData.indexOf(namepros) == -1 && nindex + 1 == words['prospects'].length) {
            newArray['prospects'].push(words['prospects'][nindex]);

            //write the data into the data_prospect file
            writeYes();
            nindex++;
        }



    }



    //callback
    function finished(err) {
        console.log('Was deleted');
        res.render('confirm_del');

    }

    function writeYes() {
        fs.writeFile('./data_prospect.json', JSON.stringify(newArray), finished);
        // Write the Json file with our new array with all the objects that we don't want to be deleted

    }
}




module.exports = deleteProspect;
