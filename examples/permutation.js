const permute = (str) => {
    const results = [];
    const arr = str.split("");
    if(str.length === 2){
        results.push(str);
        results.push(arr.reverse().join(""));
        return results;
    }
    arr.map((l, index) => {
        let cuttedString = str.slice(0, index) + str.slice(index + 1);
        const p = permute(cuttedString);
        p.map((perm) => {
            if(results.includes(l + perm)) return;

            results.push(l + perm);
        })
    });
    return results;
};
console.log(permute("bc"));
console.log(permute("abc"));
//console.log(permute("kupislona"));





module.exports.permute = permute;