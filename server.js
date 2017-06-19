var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var conatactController = require('./server/controllers/contact-controller');
var conatactDetailsController = require('./server/controllers/contact-controller');
var friendController = require('./server/controllers/friends-controller');
var requestController = require('./server/controllers/requests-controller');
var messagesController = require('./server/controllers/messages-controller');
var searchController = require('./server/controllers/search-controller');

mongoose.connect('mongodb://localhost:27017/profee');
app.use(bodyParser.json());
app.use(multipartMiddleware)
app.use('/public', express.static( __dirname + "/public"));
app.use('/node_modules', express.static( __dirname + "/node_modules"));
app.use('/uploads', express.static( __dirname + "/uploads"));
app.use('/scripts', express.static( __dirname + "/scripts"));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

//Auther

app.post('/api/user/signup', authenticationController.signup)
app.post('/api/contact/signup', authenticationController.signupContact)
app.post('/api/user/login', authenticationController.login)
app.post('/api/user/updateProfile', authenticationController.updateProfile)

app.post('/api/contact/add', conatactController.add);
app.post('/api/contact/list', conatactController.list);
app.post('/api/contact/all', conatactController.all);
app.post('/api/contact/item', conatactController.getItem);
app.post('/api/contact/itemFull', conatactController.getFullItem);
app.post('/api/contact/verifyContact', conatactController.verifyContact);
app.post('/api/contact/addComment', conatactController.addComment);
app.post('/api/contact/commentsList', conatactController.commentsList);
app.post('/api/contact/addRaiting', conatactController.addRaiting);
app.post('/api/contact/raitingList', conatactController.raitingList);

app.post('/api/messages/addMessage', messagesController.addMessage);
app.post('/api/messages/list', messagesController.list);
app.post('/api/messages/item', messagesController.item);

app.post('/api/friend/add', friendController.add);
app.post('/api/friend/list', friendController.list);
app.post('/api/friend/item', friendController.item);

app.post('/api/requests/add', requestController.add);
app.post('/api/requests/list', requestController.list);
app.post('/api/requests/item', requestController.getItem);
app.post('/api/requests/listFriendsRequests', requestController.listFriendsRequests);
app.post('/api/requests/deleteRequest', requestController.deleteRequest);
app.post('/api/requests/saveAnswer', requestController.saveAnswer);
app.post('/api/requests/getAnswer', requestController.getAnswer);
app.post('/api/requests/getAllAnswers', requestController.getAllAnswers);

app.post('/api/search', searchController.search);

app.listen('3000', function(){
	console.log("Port")
});