const {GraphQLObjectType} = require('graphql');

const authenticationQuery = new GraphQLObjectType({
    name: 'AuthenticationQuery',
    fields: {}
});

module.exports = authenticationQuery;