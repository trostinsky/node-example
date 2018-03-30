const fs = require("fs");

// Asynchro
fs.readFile("./testFiles/valid.js", (err, data) => {
    if(err){
        throw new Error(err);
    }
    console.log("READ FILE!")
    let prepared = data.toString();
    prepared += 'console.log("I wrote something")';
    fs.writeFile("./testFiles/valid.js", prepared, (err) => {
        if(err) throw new Error(err);
    })
});

