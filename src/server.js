const express = require('express');
const router = require("./router");
const path = require('path');


const app = express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"))
app.use(router);


app.listen(3030,()=>console.log("rodando"));
