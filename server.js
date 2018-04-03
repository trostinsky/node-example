// Нужно получить HTML
// Получить только текст из них
// Разбиваем по словам
// Исключить предлоги (все меньше 4)
// Перебираем массив:
// Если слова нет в объекте: добавляем
// Если есть в объекте увеличиваем count.

const http = require("http");
const https = require("https");
const { JSDOM } = require("jsdom");
const PORT = 8000;
const articles = [
    'https://en.wikipedia.org/wiki/List_of_Bluetooth_protocols#TCS',
    'https://en.wikipedia.org/wiki/File_Transfer_Protocol',
    'https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol',
    'https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol',
    'https://en.wikipedia.org/wiki/TensorFlow',
    'https://en.wikipedia.org/wiki/OpenCV',
    'https://en.wikipedia.org/wiki/Java',
    'https://en.wikipedia.org/wiki/Deep_learning',
    'https://en.wikipedia.org/wiki/Command-line_interface',
    'https://en.wikipedia.org/wiki/Computer_terminal',
    'https://en.wikipedia.org/wiki/Graphical_user_interface'
];

const getRaw = (article) => {
    return new Promise((resolve, reject) => {
        let raw = '';
        https.get(article, (res) => {
            res.on('data', (chunk) => {
                raw += chunk;
            });
            res.on("end", () => {
                resolve(raw);
            })
        })
    });
};


const analizeWiki = () => {
    return Promise.all(articles.map((article) => {
        return getRaw(article)
    })).then((raws) => {
        const wordMap = {};
        const allWords = raws.map((raw) => {
                const dom = new JSDOM(raw);
                let text = "";
                dom.window.document.querySelectorAll("#content p, #content blockquote").forEach((p) => {
                    text += p.textContent;
                });
                const reg = /[^a-z\s]/gi;
                return text.replace(reg, "");
            })
            .join("")
            .split(" ")
            .filter((word) => word.length > 4)
            .map((word) => {
                if(word in wordMap){
                    wordMap[word]++;
                } else {
                    wordMap[word] = 1;
                }
            });
        const result = [];
        for(let word in wordMap){
            if(result.length > 9){
                if(wordMap[word] > result[0].count){
                    result.shift();
                    result.push({
                        word: word,
                        count: wordMap[word]
                    });
                    result.sort((a, b) => a.count - b.count);
                }
            } else {
                result.push({
                    word: word,
                    count: wordMap[word]
                });
                result.sort((a, b) => a.count - b.count);
            }
        }
        return Promise.resolve(result);
    })
}


const server = http.createServer((request, response) => {
    if(request.url === '/hello/' &&
        request.method.toUpperCase() === 'GET'){
        response.write("HELLO GUYS!");
        response.end();
    } else if(request.url === '/analize/'){
        analizeWiki().then((result) => {
            const pretty = result.reverse().reduce((str, data, index) => {
                return str += `
                ${index + 1}: ${data.word}: ${data.count}
                `;
            }, '');
            response.write(pretty);
            response.end();
        })
    } else {
        response.write("FUCK OFF!");
        response.end();
    }
});

server.listen(PORT, () => {
    console.log(`Server Started on port:
                 http://localhost:${PORT}`);
});
