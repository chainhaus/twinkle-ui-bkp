const express = require('express');
const bodyParser = require('body-parser')
const app = express();

let firebase = require("firebase-admin");

let serviceAccount = require("./agriledger-893ec-firebase-adminsdk-p44mc-a2be295afe.json");


firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://agriledger-893ec.firebaseio.com/"
});

let db = firebase.database();

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({}));
app.use(bodyParser.json());


// this is our end-pionts!!!
app.get('/getref', (req, res) => {
  let ref = db.ref("asset");
  ref.once("value", function (snapshot) {
    console.log(snapshot.val());
    res.status(200);
    res.send(snapshot.val());
  });


});

app.get('/getref2', (req, res) => {
  let key = req.param('key');
  console.log(key);
  let ref2 = db.ref(`move/${key}`);
  ref2.once("value", function (snapshot) {
    console.log(snapshot.val());
    res.status(200);
    res.send(snapshot.val());
  });


});

//run server
app.listen(3000, (host) => {
  host = '0.0.0.0'
  console.log('app run on port: 3000');
});

