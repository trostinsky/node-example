const {test} = require("./test");
const testData = require("./testData");

const syntax = (input) => {

    const reg = /[^{}()\[\]]+/gi;
    const clearInput = input.replace(reg, "");
    const stack = [];

    const bracketsMap = {
        "}": "{",
        "]": "[",
        ")": "("
    }







    return clearInput.split("").map((bracket) => {
        if(bracket in bracketsMap){
            return stack.pop() === bracketsMap[bracket];
        } else {
            stack.push(bracket);
        }
    }).filter((result) => typeof result !== 'undefined').reduce(
        (sum, bool) => {
            return sum && bool;
        }
    );
}

test('TESTING SYNTAX FUNCTION', testData, syntax);






