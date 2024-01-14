const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const messageType = new GraphQLObjectType({
    name: 'MessageType',
    fields: {
        message: { type: GraphQLNonNull(GraphQLString) }
    }
});

module.exports = {messageType};