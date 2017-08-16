'use strict';

const express = require('express');
const app = express();

app.get('/', function (req, res) {
    var message = {
        app_id: "54a6b744-63ac-4dee-8774-808da507021d",
        contents: {"en": req.query.text},
        included_segments: ["All"]
    };

    sendNotification(message);

    res.json(message)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
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
