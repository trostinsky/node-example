const fs = require("fs");
const { syntaxWithPosition } = require("./syntax");

const lint = (path) => {
    if(!path) return false;
    fs.readFile(path, (err, data) => {
        if(err) throw new Error(err);
        const str = data.toString();

        console.log(syntaxWithPosition(str));
    })
}
lint("./testFiles/valid.js");
lint("./testFiles/invalid.js");