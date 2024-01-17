const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const messageResultType = new GraphQLObjectType({
    name: 'MessageType',
    fields: {
        message: { type: GraphQLNonNull(GraphQLString) }
    }
});

module.exports = {messageResultType};