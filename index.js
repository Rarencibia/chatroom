var ws_uri = "ws://quizzical-banach-8deba5.netlify.app/";
var websocket = new WebSocket(ws_uri);




//on websocket open: 
websocket.onopen = (event) => {
    messageAdd('<div class="message green">You have entered the chat room.</div>');

};

//on websocket closes
websocket.onclose = (event) => {
    messageAdd('<div class="message blue">You have been disconnected.</div>');
};

//When there is an error
websocket.onerror = (event) => {
    messageAdd('<div class="message red">Connection to chat failed.</div>');
};

websocket.onmessage = (event) => {
    var data = JSON.parse(event.data);

    if(data.type == "message") {
        messageAdd('<div class="message">' + data.username + ': ' + data.message + '</div>');
    }
};

document.getElementById("chat-form").addEventListener("submit", (event) => {
	event.preventDefault();

    var message_element = document.getElementsByTagName("input")[0];
    var message = message_element.value;

    if(message.toString().length) {
        var data = {
            type: "message",
            username: "You",
            message: message
        };
        websocket.send(JSON.stringify(data));
        message_element.value = "";
    }
}, false);


function messageAdd(message) {
	var chat_messages = document.getElementById("chat-messages");

	chat_messages.insertAdjacentHTML("beforeend", message);
	chat_messages.scrollTop = chat_messages.scrollHeight;
}