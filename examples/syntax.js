const {test} = require("./test");
const testData = require("./testData");

const syntax = (input) => {
    const reg = /[^{}()[\]]+/gi;
    const clearInput = input.replace(reg, "");

    const stack = [];
    const bracketsMap = {
        "}": "{",
        "]": "[",
        ")": "("
    };


    return clearInput.split("").reduce((sum, bracket) => {
        if(bracket in bracketsMap){
            return sum && stack.pop() === bracketsMap[bracket];
        } else {
            stack.push(bracket);
            return sum;
        }
    }, true);

    //return clearInput.split("").map((bracket) => {
    //    if(bracket in bracketsMap){
    //        return stack.pop() === bracketsMap[bracket];
    //    } else {
    //        stack.push(bracket);
    //    }
    //}).filter((result) => typeof result !== 'undefined').reduce(
    //    (sum, bool) => {
    //        return sum && bool;
    //    }
    //);
}

module.exports.syntaxWithPosition = (input) => {
    const lines = input.split("\n");
    lines.map((line, indexLine) => {
        line.reduce((sum, bracket, indexSymbol) => {
            if(bracket in bracketsMap){
                return sum && stack.pop() === bracketsMap[bracket];
            } else {
                stack.push(bracket);
                return sum;
            }
        }, true);
    });
}

module.exports.syntax = syntax;
//test('TESTING SYNTAX FUNCTION', testData, syntax);
