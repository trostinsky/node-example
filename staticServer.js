const http = require("http");
const fs = require("fs");
const PORT = 8000;

const urlMap = { // Routing
    '/users/': () => 'users',
    '/posts/': () => {},
    "/java/": () => {
        return fs.readFileSync("./java.png");
    },
    "/getinfo/": (params) => {
        if(params.article in cache){
            return cahce[params.article];
        }
        // ... count somthing
        const markup = `
            <div>
                HTML: Yes,
                CSS: No,
                React: Yes,
                JS: Yes,
                Node: No
            </div>
        `

        cache[params.article] = markup;
        return markup;
    },
    "/example/": () => {
        return `
            <html>
                <head>
                    <title>TEST</title>
                </head>
                <body>
                    <h1>TEST</h1>
                </body>
            </html>
        `;
    },
    public: (filename) => {
        debugger;
        try {
            return fs.readFileSync(`./public/${filename}`);
        } catch(e) {
            return "404 not found!";
        }

    }
};


const cahce = {
};



http.createServer((request, response) => {
    let index = request.url.indexOf("?");
    const url = request.url.slice(0, index);
    const queryParams = request.url.slice(index + 1)

        .split("&").reduce((general, param) => {
            const splitted = param.split("=");
            general[splitted[0]] = splitted[1];
            return general;
        }, {});

    if(url in urlMap){
        response.write(urlMap[url](queryParams));

    } else {
        let public = /^\/public\/{1}/i;
        if(public.test(url)){
            response.write(urlMap.public(
                url.replace(public, ''))
            );
        } else {
            response.write("404 not found!");
        }

    }
    response.end("END");
})
    .listen(PORT);


