var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var envValidation = require("./validators/env")
var errorMiddleware = require("./middleware/error");
var homeController = require("./controllers/home");
var detailsController = require("./controllers/details");
var paymentFailureController = require("./controllers/payment-failure");
var paymentSuccessController = require("./controllers/payment-success");
var paymentPendingController = require("./controllers/payment-pending");
var mpController = require("./controllers/mp");
var asyncMiddleware = require("./middleware/async")

var port = process.env.PORT || 3000

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', asyncMiddleware(homeController));
app.get('/detail', asyncMiddleware(detailsController));
app.get('/checkout/failure', asyncMiddleware(paymentFailureController));
app.get('/checkout/success', asyncMiddleware(paymentSuccessController));
app.get('/checkout/pending', asyncMiddleware(paymentPendingController));

app.post('/mp/webhook', asyncMiddleware(mpController));

app.use(errorMiddleware);

app.listen(port);