

const test = (description, array, func) => {
    console.log(`Test: ${description}`);
    array.forEach((value, number) => {
        const funcResult = func(value.input);
        console.log(`

            Test number: ${number + 1}
            ---------------------------->
            RESULT: ${funcResult === value.output}
            I GOT: ${funcResult}
            I EXPECT: ${value.output}
            <----------------------------
        `);
    })
}
module.exports.test = test; // export test