
const scholarsRoutes = require('./routes/scholarsRoutes.js');
const storiesRoutes = require('./routes/storiesRoutes.js');
const baseRoutes = require('./routes/baseRoutes.js');
const accepted_storiesRoutes = require('./routes/acceptedStoriesRoutes.js');
const loginRoutes = require('./routes/loginRoutes.js');
const acceptedScholarsRoutes = require('./routes/acceptedScholarsRoutes.js');
const editContentRoutes = require('./routes/editContentRoutes.js');
const rejectedScholarsRoutes = require('./routes/rejectedScholarsRoutes.js');

const express = require("express");
const app = express();

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, DELETE");
    res.header("Access-Control-Allow-Methods","PATCH, POST, GET, PUT, DELETE, OPTIONS");

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/api', baseRoutes);
app.use('/api/scholars', scholarsRoutes);
app.use('/api/accepted-scholars', acceptedScholarsRoutes);
app.use('/api/rejected-scholars', rejectedScholarsRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/accepted-stories', accepted_storiesRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/editContent', editContentRoutes);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(3000, () => {
    console.log("server started on port 3000");
});