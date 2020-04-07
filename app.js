const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors())

mongoose.connect('mongodb://adnan:test123@doctorify-shard-00-00-6edsj.gcp.mongodb.net:27017,doctorify-shard-00-01-6edsj.gcp.mongodb.net:27017,doctorify-shard-00-02-6edsj.gcp.mongodb.net:27017/test?ssl=true&replicaSet=doctorify-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('connect mongodb'))
        .catch((e) => console.log(e.message))

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('request on port 4000')
})
