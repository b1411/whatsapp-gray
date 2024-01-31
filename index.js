const { Client } = require("whatsapp-web.js");
let qrcode = require("qrcode-terminal");

const client = new Client();

const HOST = "http://127.0.0.1:8000";

async function get_jasik_response(msg) {
    let res = await fetch(`${HOST}/chat-api/`, {
        method: "POST",
        body: JSON.stringify({"text": msg}),
        headers: {
            "Content-Type": "application/json",
        },
    });
    let answer = await res.json();
    return answer;
}

client.on("qr", (qr) => {
    // Generate and scan this code with your phone
    console.log("QR RECEIVED", qrcode.generate(qr, {small: true}));
});

client.on("ready", () => {
    console.log("Client is ready!");
});

client.on("message", (msg) => {

    console.log("MESSAGE RECEIVED", msg.body);
    get_jasik_response(msg.body)
        .then((answer) => {
            console.log("ANSWER", answer.message);
            msg.reply(answer.message);
        })
        .catch((err) => {
            console.log(err);
        });
});

client.initialize();
