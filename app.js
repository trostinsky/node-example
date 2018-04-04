const {test} = require('./examples/test'); // import test from
const { permute } = require("./examples/permutation.js");
const {format} = require("winston");
//const logger = require("color-logger");
const chalk = require("chalk");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const colors = [
    "Синий",
    "Красный",
    "Зеленый",
    "Оранжевый",
    "Желтый",
    "Фиолетовый",
    "Голубой",
    "Малиновый",
    "Розовый",
    "Чёрный",
    "Медный"
];

const logQuestion = (word, {red, green, blue}) => {
    console.log(chalk.rgb(red, green, blue)(word))
};
//
//const colors = {
//    "#ff0000": "Красный",
//    "#00ff00": "Зеленый",
//    "#0000ff": "Синий"
//}
//
//const colorHexs = Object.keys(colors),
//    colorWords = Object.values(colors);

setInterval(() => {
    const word = colors[getRandomInt(0, colors.length)];
    logQuestion(word, {
        red: getRandomInt(0, 256),
        green: getRandomInt(0, 256),
        blue: getRandomInt(0, 256)
    })
    //const randomColor = colorHexs[getRandomInt(0, colorHexs.length)];
    //const randomWord = colorWords[getRandomInt(0, colorWords.length)];
    //console.log(chalk.hex(randomColor)(randomWord))
}, 1000);