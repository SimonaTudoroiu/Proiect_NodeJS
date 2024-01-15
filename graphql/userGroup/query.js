const { GraphQLObjectType } = require("graphql");

const userGroupQuery = new GraphQLObjectType({
    name: "userGroupQueryType",
    fields: {},
});

module.exports = userGroupQuery;