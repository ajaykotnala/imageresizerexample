const express = require("express");

const Routes = require('./router');
const app = express();

app.use(express.static("./uploads"));
app.use(Routes);

app.listen(5050);