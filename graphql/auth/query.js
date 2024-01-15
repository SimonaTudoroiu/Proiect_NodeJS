const { GraphQLObjectType } = require("graphql");

const authQuery = new GraphQLObjectType({
    name: "AuthQueryType",
    fields: {},
});

module.exports = authQuery;