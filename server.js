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
var globalController = require('./server/controllers/global-controller')
var predefinedController = require('./server/controllers/predefined-controller')

mongoose.connect('mongodb://localhost:27017/profee');
app.use(bodyParser.json());
app.use(multipartMiddleware)
app.use('/public', express.static( __dirname + "/public"));
app.use('/node_modules', express.static( __dirname + "/node_modules"));
app.use('/uploads', express.static( __dirname + "/uploads"));

app.get('/', function(req, res){
	res.sendfile('index.html');
});

//Auther

app.post('/api/user/signup', authenticationController.signup)
app.post('/api/user/login', authenticationController.login)

app.post('/api/contact/add', conatactController.add);
app.post('/api/contact/list', conatactController.list);

app.post('/api/friend/add', friendController.add);
app.post('/api/friend/list', friendController.list);

app.post('/api/requests/add', requestController.add);
app.post('/api/requests/list', requestController.list);
app.post('/api/requests/item', requestController.getItem);
app.post('/api/requests/listFriendsRequests', requestController.listFriendsRequests);
app.post('/api/requests/deleteRequest', requestController.deleteRequest);

app.post('/api/global/add', globalController.add);
app.get('/api/global/list', globalController.list);
app.get('/api/global', globalController.item);

app.post('/api/predefined/addPhoto', multipartMiddleware, predefinedController.addPhoto);
app.post('/api/predefined/add', predefinedController.add);

app.get('/api/predefined/list', predefinedController.getList);

app.listen('3000', function(){
	console.log("Port")
});