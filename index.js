const app = require('./app');

app.start(8080).then(() => {
    console.log("Server is running on http://localhost:8080");
});

module.exports = app;