const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

const userProfileType = new GraphQLObjectType({
    name: 'UserProfileType',
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        mail: { type: GraphQLString },
        description: { type: GraphQLString },
        hobbies: { type: GraphQLString }
    }
});

module.exports = {userProfileType};