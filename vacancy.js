const http = require("http");
const https = require("https");
const fs = require("fs");
const { JSDOM } = require("jsdom");
const PORT = 8000;

const query = (url) => {
    let index = url.indexOf("?");
    return url.slice(index + 1)
        .split("&").reduce((general, param) => {
            const splitted = param.split("=");
            general[splitted[0]] = splitted[1];
            return general;
        }, {});
}


const getRaw = (article) => {
    return new Promise((resolve, reject) => {
        let raw = '';
        try{
            https.get(article, (res) => {
                res.on('data', (chunk) => {
                    raw += chunk;
                });
                res.on("end", () => {
                    resolve(raw);
                })
            })
        } catch(e) {
            reject(e);
        }

    });
};

const skills = ['HTML', "CSS", "JAVASCRIPT", "REACTJS", "NODEJS",
    "GIT", "REDUX", "PHP", "Office", "Excel"];

const form = fs.readFileSync("./form.html");

const cache = {};

const urlMap = { // Routing
    '/getinfo/': (request, response) => {
        const article = query(request.url).article;
        if(article in cache){
            response.write(`${article} \n`);
            response.write(cache[article]);
            response.end();
            return;
        }
        getRaw(article).then((html) => {
            const result = {};
            skills.map((skill) => {
                const reg = new RegExp(`\\s${skill}+`, "gi");
                result[skill] =  reg.test(html);
            });
            let markup = ``;
            for(let skill in result){
                markup += `${skill}: ${result[skill]} \n`;
            }
            response.write(`${article} \n`);
            response.write(markup);
            response.end();
            cache[article] = markup;
        });
    },
    '/form/': (request, response) => {
        response.end(form);
    }
}

http.createServer((request, response) => {
    const index = request.url.indexOf("?");
    const url = index > 0 ? request.url.slice(0, index) : request.url;
    if(url in urlMap){
        urlMap[url](request, response);
    } else {
        response.end("404 not found!")
    }
}).listen(PORT);