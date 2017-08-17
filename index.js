'use strict';

const express = require('express');
const app = express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');

    var message = {
        app_id: "54a6b744-63ac-4dee-8774-808da507021d",
        contents: {"en": req.query.text},
        included_segments: ["All"]
    };

    sendNotification(message);

    res.send(`<pre>${message}</pre>`)
})

app.listen(port, function () {
  console.log(`Armis n Play app listening on port ${port}!`);
});


/**
 * Send a notification to browser through OneSignal
 *
 * @param {any} data
 */
function sendNotification(data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic NmI3OThjYjQtY2Q3My00OTNjLThlMDUtMjI2MGUzNzk1NTI5"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};
