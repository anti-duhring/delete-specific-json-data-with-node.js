# Delete specific json data with Node.js
How to delete an specific json data with Node.js

First we write our Json data

![1](https://user-images.githubusercontent.com/99638905/155937328-cede8161-1038-4b5f-9bc3-7e9308315717.png)

So we create a new object like our Json data but with the array blanked
```javascript
var newArray = {
    'prospects': []
};
```

And we read the Json data from the url
```javascript
// Read the data
const data = fs.readFileSync('./data_prospect.json');
const dados = data['prospects'];
// Transform the data into javascript file
var words = JSON.parse(data);
```

And we use the `for` method to find each object on the json data and check if the name matches with the name of the object that we want to delete

```javascript
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
```

If the name of the object finded don't match with the name of the object that we want to delete we push him on the new array
```javascript
newArray['prospects'].push(words['prospects'][nindex]);
```

So at the end we write the Json file with our new array
```javascript
    function writeYes() {
        fs.writeFile('./data_prospect.json', JSON.stringify(newArray), finished);
        // Write the Json file with our new array with all the objects that we don't want to be deleted

    }
```
