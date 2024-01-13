const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphGLInputObjectType,
    GraphQLUnionType,
    
} = require('graphql');
const db = require('../../models');
const userProfileType = require('../userProfile/types');
const messageResultType = require('../types');

const loginInputType = new GraphQLInputObjectType({
    name: 'LoginInputType',
    fields: {
        username: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
    },
});

const loginResultType = new GraphQLObjectType({
    name: 'LoginResultType',
    fields: {
        token: {type: GraphQLString},
        error: {type: GraphQLString},
    },
});

const registerInputType = new GraphQLInputObjectType({
    name: 'RegisterInputType',
    fields: {
        username: {type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
        mail: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLNonNull(GraphQLString)},
        hobbies: {type: GraphQLNonNull(GraphQLString)},
    },
});

const registerResultType = new GraphQLObjectType({
    name: 'RegisterResultType',
    types: [userProfileType, messageResultType],
    resolveType: (value) => {
        if (value instanceof db.UserProfile){
            return "UserProfileType";
        }

        return "MessageResultType";
    }
});

        
module.exports = {
    loginInputType,
    loginResultType,
    registerInputType,
    registerResultType,
    messageResultType,
};



