const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require("./graphql");


const app = express();
app.use(express.json());

const db = require('./models');
const {JWT_SECRET} = require('./config/constants');
const jwt = require('jsonwebtoken');
const { graphql } = require('graphql');

const checkAuthorization = async(req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization){
        next();
        return res.status(401).send('Unauthorized');
    }

    const token = authorization.replace('Bearer ', '');

    const data = jwt.verify(token, JWT_SECRET);
  
    const user = await db.User.findByPk(data.userId);
    
    if(user) {
      req.user = user.dataValues;
    }
  
    next();
  }

  app.all(graphql, checkAuthorization, createHandler({
    schema,
    context: (req) => {
        return req.raw.user;
    },

    }))
    
    async function start(port) {
        return new Promise((resolve) => app.listen({port}, resolve));
    }
    


// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// async function start(port) {
//     return new Promise((resolve) => app.listen({port}, resolve));
// }

module.exports = {
    start
}