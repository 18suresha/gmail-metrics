# gmail-metrics

## Description

An AWS Lambda function pulls data from Gmail using the Gmail API every hour and inserts the data into a DynamoDB table. An Express endpoint deployed on Elastic Beanstalk pulls and returns data from the table based on the query parameters. This is then visualized using Vue.js and Bootstrap.

***

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
