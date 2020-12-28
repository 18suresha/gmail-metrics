var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2' });

const ddb = new AWS.DynamoDB.DocumentClient();

/* GET home page. */
router.get('/', function (req, res, next) {
  const promise = new Promise((resolve, reject) => {
    let min_timestamp = Math.floor(new Date(req.query.date).getTime() / 1000) + (req.query.hour * 3600);
    let max_timestamp = min_timestamp + 3599;
    let arr = {
      fmtg: 0,
      fmtng: 0,
      fgtm: 0,
      fngtm: 0
    };
    let cnt = 0;
    for (let key in arr) {
      var params = {
        KeyConditionExpression: "metric = :m and tstamp between :min and :max",
        ExpressionAttributeValues: {
          ':m': key,
          ':min': min_timestamp,
          ':max': max_timestamp
        },
        TableName: 'gmail_metrics',
      };
      ddb.query(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          reject(err);
        } else {
          data.Items.forEach(function (item) {
            arr[key] = item.count;
          });
          cnt += 1;
          if (cnt == 4) {
            resolve(arr);
          }
        }
      });
    }
  });
  promise.then(result => {
    res.json(result);
  }).catch(err => {
    res.json({ Error: err })
  });
  // res.json({ values: arr });
});

module.exports = router;
