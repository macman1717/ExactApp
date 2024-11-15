const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['server.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes(remove-after-meeting)' only the
root file where the route starts, such as index.js, app.js, routes(remove-after-meeting).js, etc ... */

swaggerAutogen(outputFile, routes, doc);