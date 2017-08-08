var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './public/uploads' });
var multer = require('multer');
var jwt = require("jsonwebtoken");

var app = express();
var authenticationController = require('./server/controllers/authentication-controller');
var conatactController = require('./server/controllers/contact-controller');
var friendController = require('./server/controllers/friends-controller');
var requestController = require('./server/controllers/requests-controller');
var messagesController = require('./server/controllers/messages-controller');
var searchController = require('./server/controllers/search-controller');
var categoriesController = require('./server/controllers/categories-controller');

/*app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


// process.env.TMPDIR = '/public/uploads/';
/*var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };     
mongoose.connect('mongodb://localhost:27017/profee',options);*/
/*mongoose.connect('mongodb://localhost:27017/profee');*/
mongoose.connect('mongodb://admin:admin@ds139352.mlab.com:39352/heroku_fbhj1m5n');
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
app.post('/api/user/updateProfile', authenticationController.updateProfile);
app.post('/api/user/addPhoto',  multipartMiddleware, authenticationController.addPhoto);
app.post('/api/user/findByContactsList', authenticationController.findByContactsList);
app.post('/api/user/uploadBounds', authenticationController.uploadBounds);

app.post('/api/contact/add', conatactController.add);
app.post('/api/contact/addExist', conatactController.addExist);
app.post('/api/contact/deleteExist', conatactController.deleteExist);
app.post('/api/contact/list', conatactController.list);
app.post('/api/contact/all', conatactController.all);
app.post('/api/contact/changeRaiting', conatactController.changeRaiting);
app.post('/api/contact/item', conatactController.getItem);
app.post('/api/contact/changeHiddenStatus', conatactController.changeHiddenStatus);
app.post('/api/contact/itemFull', conatactController.getFullItem);
app.post('/api/contact/verifyContact', conatactController.verifyContact);
app.post('/api/contact/addComment', conatactController.addComment);
app.post('/api/contact/commentsList', conatactController.commentsList);
app.post('/api/contact/addRaiting', conatactController.addRaiting);
app.post('/api/contact/updateRaiting', conatactController.updateRaiting);
app.post('/api/contact/updateInfo', conatactController.updateInfo);
app.post('/api/contact/updateInfoByContact', conatactController.updateInfoByContact);
app.post('/api/contact/raitingList', conatactController.raitingList);
app.post('/api/contact/getAlloverList', conatactController.getAlloverList);

app.post('/api/messages/addMessage', messagesController.addMessage);
app.post('/api/messages/list', messagesController.list);
app.post('/api/messages/item', messagesController.item);

app.post('/api/categories/list', categoriesController.list);
app.post('/api/categories/item', categoriesController.item);

app.post('/api/friend/add', friendController.add);
app.post('/api/friend/list', friendController.list);
app.post('/api/friend/item', friendController.item);
app.post('/api/friend/listFriendsRequests', friendController.listFriendsRequests);
app.post('/api/friend/listSendedRequests', friendController.listSendedRequests);
app.post('/api/friend/accept', friendController.accept);
app.post('/api/friend/deleteFriend', friendController.deleteFriend);

app.post('/api/requests/add', requestController.add);
app.post('/api/requests/list', requestController.list);
app.post('/api/requests/item', requestController.getItem);
app.post('/api/requests/listFriendsRequests', requestController.listFriendsRequests);
app.post('/api/requests/deleteRequest', requestController.deleteRequest);
app.post('/api/requests/changeRequest', requestController.changeRequest);
app.post('/api/requests/saveAnswer', requestController.saveAnswer);
app.post('/api/requests/getAnswer', requestController.getAnswer);
app.post('/api/requests/getAllAnswers', requestController.getAllAnswers);

app.set('port', (process.env.PORT || 5000));
     
app.post('/api/search', searchController.search);
var User = require('./server/datasets/users');
app.get('/api/me', ensureAuthorized, function(req, res) {
    console.log(req.token)
    User.findOne({token: req.token}, function(err, user) {
        console.log(user)
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
});
function ensureAuthorized(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.send(403);
    }
}

process.on('uncaughtException', function(err) {
    console.log(err);
});

app.listen(app.get('port'), function(){
	console.log("Port",app.get('port'))
});