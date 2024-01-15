const { GraphQLObjectType } = require("graphql");

const userQuery = new GraphQLObjectType({
    name: "userQuery",
    fields: {},
});

module.exports = userQuery;