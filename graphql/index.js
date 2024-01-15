const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const { postQuery, postMutation } = require("./post");
const { groupQuery, groupMutation } = require("./group");
const { commentQuery, commentMutation } = require("./comment");
const { userQuery, userMutation } = require("./user");
const { userGroupQuery, userGroupMutation } = require("./userGroup");
const {authQuery, authMutation} = require("./auth");

const query = new GraphQLObjectType({
    name: "Query",  
    fields: {
        ...postQuery.toConfig().fields,
        ...groupQuery.toConfig().fields,
        ...commentQuery.toConfig().fields,
        ...userQuery.toConfig().fields,
        ...userGroupQuery.toConfig().fields,
        ...authQuery.toConfig().fields
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        ...postMutation.toConfig().fields,
        ...groupMutation.toConfig().fields,
        ...commentMutation.toConfig().fields,
        ...userMutation.toConfig().fields,
        ...userGroupMutation.toConfig().fields,
        ...authMutation.toConfig().fields
    }
});

const schema = new GraphQLSchema({
    query,
    mutation
});

module.exports = schema;
