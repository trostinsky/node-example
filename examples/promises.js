//1 Запрос к БД - асинх
//2 Преобразовать - синх
//3 Отправить данные курьеру - асинх
//4 Получили от него ответ - асинх
//5 Отправляем запрос на доставку - асинх
//6 Получаем ответ - асинх
//7 Отправляем курьеру сообщение - асинх

//// ..
//
//const BDRequest = (orderId, callback) => {
//    callback(data);
//}
//
//
//const delivery = (item, orderId) => {
//    log()
//    BDRequest(orderId, (data) => {
//        log()
//        let data = prepare(data);
//        sendToCourier(data, (response) => {
//            log()
//            sendToCustomer(response, (answer) => {
//                log()
//                sendToCourier(answer, () => {
//                    log()
//                    console.log("YEAP!!! Callback Hell!!!!");
//                    sendMessage("YEAP!", () => {
//                        log()
//
//                    })
//                })
//            })
//        });
//    });
//}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const prom = (sec) => new Promise((resolve, reject) => {
    if(sec > 1000) reject(new Error("So much time..."));
    setTimeout(() => {
        resolve(sec);
    }, sec);
}).catch((err) => {
    console.log(err);
});

Promise.all([
        prom(getRandomInt(500, 10000)),
        prom(getRandomInt(500, 1000)),
        prom(getRandomInt(500, 1000)),
        prom(getRandomInt(500, 6000)),
        prom(getRandomInt(500, 1000)),
        prom(getRandomInt(500, 1000))
])
    .then((results) => {
        console.log(results);
    })
    .catch((err) => {
        console.warn(err);
    });



//prom(1000)
//    .then((sec) => {
//        console.log(`${sec}`);
//    let error = new Error("I'm shy...");
//    error.status = 418;
//        throw error
//        return prom(3000);
//    })
//    .then(() => {
//        console.log("8 second");
//    })
//    .catch((err) => {
//        console.log(err.status);
//    })