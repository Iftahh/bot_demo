// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());

var messages = [];
var participants = [];

function sendMessage(msg) {
  messages.push(msg);
  if (messages.length > 250) {
    messages = messages.slice(messages.length-250);  // avoid filling the server memory
  }
  io.emit('webhook message', msg);
}

io.on('connection', function(socket) {
  var participant = {
    nick: null
  };
  participants.push(participant);

  // Play back all messages to connecting user
  messages.forEach(function(message) {
    socket.emit('webhook message', message);
  });

  socket.on('register', function(name) {
    participant.nick = name;
  });

  socket.on('disconnect', function() {
    remove(participants, participant);
  });
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// listen for requests :)
listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

function remove(array, item) {
  index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }
}


function sendResponse(request, response, messages) {
    response.setHeader('Content-Type', 'application/json');
    result = JSON.stringify({ messages: messages , botkitVersion:BOTKIT_API_LATEST_VERSION});
    sendMessage({_type: "Output", url:request.originalUrl, message: result});
    response.send(result);
    response.sendStatus(200);
}

function sendWebhookInput(request) {
  sendMessage({_type:"Input", url:request.originalUrl, message: JSON.stringify(request.body)});
}

// Configure BotKit Admin's webhooks to these URL

BOTKIT_API_LATEST_VERSION = "0.3.0";

app.post("/search_flight", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, [
        {_type:"TextMessage", text:"Here are your flights"},
        {_type:"ImageMessage", imageUrl:"http://www.fortresslockandsecurity.com/wp-content/uploads/2014/04/Austin-Locksmith.png"}
 ]);
});

app.post("/search_car", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/search_hotel", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/search_cruise", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/chat_greeting", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_gate_number", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_departure_time", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_arrival_time", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_boarding_time", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_itinerary", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/reservation_show", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, [{_type:"TextMessage", text:"You have no reservations."}]);
});

app.post("/reservation_cancel", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/flight_status", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/contact_support", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/airport_navigation", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/change_booking", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/arrivals", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/departures", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});

app.post("/show_help", function (request, response) {
  sendWebhookInput(request);
  sendResponse(request, response, []);
});


