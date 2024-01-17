const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLUnionType,
  } = require("graphql");
const db = require("../../models");
const { userProfileType } = require("../userProfile/types");
const { messageResultType } = require("../types");

const loginInputType = new GraphQLInputObjectType({
    name: 'LoginInputType',
    fields: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) }
    }
});

const loginResultType = new GraphQLObjectType({
    name: 'LoginResultType',
    fields: {
        token: { type: GraphQLString },
        
    }
});

const registerInputType = new GraphQLInputObjectType({
    name: 'RegisterInputType',
    fields: {
        username: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        mail: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        hobbies: { type: GraphQLString }
    }
});

const registerResultType = new GraphQLUnionType({
    name: 'RegisterResultType',
    types: [userProfileType, messageResultType],
    resolveType: (value) => {
        if (value instanceof db.UserProfile) {
            return "UserProfileType";
        }

        return "MessageResult";
    },
});

module.exports = {
    loginInputType,
    loginResultType,
    registerInputType,
    registerResultType
};    
