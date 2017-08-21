var bodyParser = require('body-parser');
var express = require('express')
    , api = require('./facebook')
    , oauth = require('./oauth')
    , app = express();
const _port = process.env.PORT||3000;
// Setup middleware
app.use(express.static(__dirname));
app.use(bodyParser());

app.post('/post', function (req, res) {
    // Check to ensure user has a valid access_token
    console.log(oauth.access_token);
    console.log(req.body.message);
     console.log(res);
    if (oauth.access_token) {

        // Call function that contains API call to post on Facebook (see facebook.js)
        api.postMessage(oauth.access_token, req.body.message, res);

    } else {
        console.log("Couldn't confirm that user was authenticated. Redirecting to /");
        res.redirect('/');
    }
});

// Routes for OAuth calls
app.get('/login', oauth.login);
app.get('/callback', oauth.callback);

app.listen(_port);
 console.log(`server is listening at ${_port}`);